import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AnnoncesService } from '../../_services/annonces.services';
import { UserService } from '../../_services/users.service';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-annonces.component.html',
  styleUrls: ['./add-annonces.component.scss'],
  providers: [DatePipe],
})
export class AddAnnounceComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  showSuccess: boolean = false;
  createAnnounceForm = this.formBuilder.group({
    date_debut: ['', [Validators.required, this.validateDate()]],
    date_fin: ['', [Validators.required, this.validateDate()]],
    title: ['', Validators.required],
    description: ['', Validators.required],
    user_id: [''],
    nbre_notif: [''],
  });
  submitted = false;
  dateCompare: boolean = false;
  dateMax: boolean = false;
  isLoader: boolean = false;
  hideTitleModal = this.translate.instant('NOTIFICATION.ADD_PUB_TITLE');
  hideForm = false;
  errorMessage = null;
  statusList: any = [
    { id: 1, name: 'PROGRAM' },
    { id: 2, name: 'ENCOURS' },
    { id: 3, name: 'CLOTURE' },
  ];
  usersList: any = [
    { id: 1, name: 'user1' },
    { id: 2, name: 'user2' },
    { id: 3, name: 'user3' },
  ];
  files: any = [];
  areasList: any;
  Providers: any = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public AnnounceService: AnnoncesService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.generateForm();
    this.AnnounceService.getAreas().subscribe((res: any) => {
      this.areasList = res.body?.data;
    });
    this.getProvider();
  }
  getProvider() {
    // this.userService.getProviderList().subscribe(
    //   (res: any) => {
    //     this.Providers = res.body;
    //   }
    // );
  }
  generateForm() {
    return this.formBuilder.group({
      date_debut: [
        this.formatDate(new Date()),
        [Validators.required, this.validateDate()],
      ],
      date_fin: [
        this.formatDate(new Date()),
        [Validators.required, this.validateDate()],
      ],
      title: ['', Validators.required],
      description: ['', Validators.required],
      user_id: [''],
      nbre_notif: [''],
    });
  }
  cancel() {
    this.createAnnounceForm = this.generateForm();
    this.close.emit(false);
  }
  pubSubmit() {
    this.submitted = true;
    if (this.createAnnounceForm.valid) {
      this.submitted = false;
      const formData = new FormData();
      formData.append(
        'start_date',
        this.formatDate(
          new Date(this.createAnnounceForm.controls['date_debut'].value)
        )
      );
      formData.append(
        'end_date',
        this.formatDate(
          new Date(this.createAnnounceForm.controls['date_fin'].value)
        )
      );
      formData.append('title', this.createAnnounceForm.controls['title'].value);
      formData.append(
        'description',
        this.createAnnounceForm.controls['description'].value
      );
      formData.append(
        'user_id',
        this.createAnnounceForm.controls['user_id'].value
      );
      formData.append(
        'nbre_notif',
        this.createAnnounceForm.controls['nbre_notif'].value
      );
      formData.append(
        'user_id',
        this.createAnnounceForm.controls['user_id'].value
      );

      if (this.dateMax == false) {
        this.isLoader = true;
        this.AnnounceService.storeAnnounce(formData).subscribe(
          (res: any) => {
            if (res.status == 201) {
              this.cancel();
              this.showSuccess = !this.showSuccess;
              this.hideTitleModal = '';
              this.submitted = false;
              this.createAnnounceForm.reset();
              this.generateForm();
              this.isLoader = false;
              Swal.fire({
                text: 'Annonce ajouté avec succès !',
                icon: 'success',
                showCancelButton: false,
                customClass: {
                  confirmButton: 'btn-primary',
                },
              }).then(() => {});
            }
          },
          (error: any) => {
            this.errorMessage = error.error.message;
          }
        );
      }
    }
  }
  numberOnly(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 46 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  validateDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value) {
        const maxYear = 2050;
        const date_debut = this.createAnnounceForm.get('date_debut')?.value;
        const date_fin = this.createAnnounceForm.get('date_fin')?.value;
        const currentYearStartDate = new Date(date_debut).getFullYear();
        const currentYearEndDate = new Date(date_fin).getFullYear();
        if (currentYearStartDate > maxYear || currentYearEndDate > maxYear) {
          this.dateMax = true;
          return { yearRange: true };
        } else {
          this.dateMax = false;
        }
      }

      return null;
    };
  }

  updateValidation(event: any) {
    if (this.createAnnounceForm.controls['type'].value == 'IMAGE') {
      this.createAnnounceForm.controls['file'].setValidators([
        Validators.required,
      ]);
      this.createAnnounceForm.controls['file'].clearValidators();
    } else {
      this.createAnnounceForm.controls['file'].setValidators([
        Validators.required,
      ]);
      this.createAnnounceForm.controls['file'].clearValidators();
    }
    this.createAnnounceForm.controls['file'].updateValueAndValidity();
  }
  get f() {
    return this.createAnnounceForm.controls;
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
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
}
