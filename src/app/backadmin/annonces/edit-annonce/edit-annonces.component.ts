import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AnnoncesService } from '../../_services/annonces.services';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-annonces',
  templateUrl: './edit-annonces.component.html',
  styleUrls: ['./edit-annonces.component.scss']
})
export class EditAnnoncesComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  showSuccess: boolean = false;
  editAnnounceForm = this.formBuilder.group({
    date_debut: ['', [Validators.required,this.validateDate()]],
    date_fin: ['', [ Validators.required,this.validateDate()]],
    title: ['', Validators.required],
    description:['', Validators.required],
    user_id:[''],
    nbre_notif:[''],
  });
  submitted = false;
  dateCompare: boolean = false;
  dateMax: boolean = false;
  isLoader:boolean=false;
  hideTitleModal = this.translate.instant("NOTIFICATION.ADD_PUB_TITLE");
  hideForm = false;
  errorMessage = null;
  statusList:any=[{id:1,name:'PROGRAM'},{id:2,name:'ENCOURS'},{id:3,name:'CLOTURE'}]
  usersList:any=[{id:1,name:'user1'},{id:2,name:'user2'},{id:3,name:'user3'}]
  @Input() annonceId!: number;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public announceService: AnnoncesService,
    private datePipe: DatePipe

  ) { }
  ngOnInit() {
    this.generateForm()
  }
  ngOnChanges() {

    this.announceService.getAnnounce(this.annonceId).subscribe((response: any) => {
      this.editAnnounceForm.patchValue({
        date_debut: this.formatDate(new Date(response.body.start_date)),
        date_fin: this.formatDate(new Date(response.body.end_date)),
        title: response.body.title,
        description: response.body.description,
        nbre_notif: response.body.nbre_notif,
        user_id: response.body.user_id,
      });
    });
  }

  generateForm() {
    return this.formBuilder.group({
      date_debut: [this.formatDate(new Date()), [Validators.required,this.validateDate()]],
      date_fin: [this.formatDate(new Date()), [ Validators.required,this.validateDate()]],
      title: ['', Validators.required],
      description:['', Validators.required],
      user_id:[''],
      nbre_notif:[''],
    });
  }
  cancel() {
    this.editAnnounceForm = this.generateForm();
    this.showSuccess = false;
    this.close.emit(false);
  }
  pubSubmit() {
    this.submitted = true;
    if (this.editAnnounceForm.valid) {
      this.submitted = false;
      const formData = new FormData();      
      formData.append('start_date', this.formatDate(new Date(this.editAnnounceForm.controls['date_debut'].value)));
      formData.append('end_date', this.formatDate(new Date(this.editAnnounceForm.controls['date_fin'].value)));
      formData.append('title', this.editAnnounceForm.controls['title'].value);
      formData.append('description', this.editAnnounceForm.controls['description'].value);
      formData.append('user_id', this.editAnnounceForm.controls['user_id'].value);
      formData.append('nbre_notif', this.editAnnounceForm.controls['nbre_notif'].value);
      formData.append('user_id', this.editAnnounceForm.controls['user_id'].value);


      if (this.dateMax == false) {
        this.isLoader = true;
        this.announceService.updateAnnounce(formData,this.annonceId).subscribe((res: any) => {
          if (res) {
            this.hideForm = !this.hideForm;
              this.hideTitleModal = "";
              this.submitted = false;
              this.editAnnounceForm.reset();
              this.generateForm();
              this.isLoader = false;
              this.cancel();
            Swal.fire({
              text: "Annonce édité avec succès !",
              icon: 'success',
              showCancelButton: false,
              customClass: {
                confirmButton: 'btn-primary',
              }
            }).then(() => {})
          }
        },
          (error:any) => {
            this.errorMessage = error.error.message
          })
      }
    }
  }

  get f() {
    return this.editAnnounceForm.controls
  }

  numberOnly(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 46 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  validateDate(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value) {
        const maxYear = 2050;
        const start_date = this.editAnnounceForm.get('start_date')?.value
        const end_date = this.editAnnounceForm.get('end_date')?.value
        const currentYearStartDate = new Date(start_date).getFullYear();
        const currentYearEndDate = new Date(end_date).getFullYear();
        if ( currentYearStartDate > maxYear || currentYearEndDate > maxYear) {
          this.dateMax = true
          return { 'yearRange': true };
        }else{
          this.dateMax = false
        }
      }

      return null;
    };
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
  }
}
