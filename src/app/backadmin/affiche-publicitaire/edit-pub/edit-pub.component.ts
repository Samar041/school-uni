import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AffichePublicitaireService } from '../../_services/affiche-publicitaire.services';
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';
import { getFileNameFromPath, objectToFormData } from './../../shared/utils/utils'

@Component({
  selector: 'app-edit-pub',
  templateUrl: './edit-pub.component.html',
  styleUrls: ['./edit-pub.component.scss']
})
export class EditPubComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Input() pubId: any;
  @Input() list: any;
  showSuccess: boolean = false;
  editPubForm = this.generateForm();
  videoSrc: any;
  videoName: any;
  coverName: any;
  coverSrc: any;
  submitted = false;
  path: any = [];
  pathCouv: any = [];
  newPathCouverture: any;
  filesCouverture: any = [];
  files: any = [];
  dateCompare: boolean = false;
  dateMax: boolean = false;
  isLoader: boolean = false;
  hideTitleModal = this.translate.instant("NOTIFICATION.ADD_PUB_TITLE");
  hideForm = false;
  errorMessage = null;
  statusList: any = [{ id: 1, name: 'PROGRAM' }, { id: 2, name: 'ENCOURS' }, , { id: 3, name: 'CLOTURE' }]
  usersList: any = [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }, { id: 3, name: 'user3' }]
  dateMessage = "";
  Providers: any = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public affichePublicitaireService: AffichePublicitaireService,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.getProviders();
  }
  ngOnChanges() {
    if (this.pubId) {
      if (this.pubId.type === "image") {
        this.newPathCouverture = this.pubId.file;
      }
      else {
        this.videoSrc = this.pubId.file
      }
      this.editPubForm.patchValue({
        date_debut: this.pubId.date_debut,
        date_fin: this.pubId.date_fin,
        montant: this.pubId.montant,
        type: this.pubId.type,
        user_id: this.pubId.user_id,
        areas_id: this.pubId.areas?.length ? this.pubId.areas.map((i: any) => i.id) : ''
      })
    }
  }
  generateForm() {
    return this.formBuilder.group({
      type: [''],
      date_debut: ['', [Validators.required, this.validateDate()]],
      date_fin: ['', [Validators.required, this.validateDate()]],
      montant: ['', Validators.required],
      user_id: [''],
      image: [''],
      video: [''],
      cover: [''],
      areas_id: ['']
    });
  }
  cancel() {
    this.editPubForm = this.generateForm();
    this.showSuccess = false;
    this.close.emit();
  }
  pubSubmit() {
    if (this.editPubForm.valid) {
      this.isLoader = true;
      const formData = new FormData();
      formData.append('date_debut', this.editPubForm.controls['date_debut'].value + "T00:00");
      formData.append('date_fin', this.editPubForm.controls['date_fin'].value + "T23:59");
      if (this.editPubForm.controls['user_id'].value)
        formData.append('user_id', this.editPubForm.controls['user_id'].value);
      if (this.editPubForm.controls['montant'].value == (null || undefined)) {
        formData.append('montant', '');
      }
      else {
        formData.append('montant', this.editPubForm.controls['montant'].value);
      }
      if (this.files.length !== 0) {
        if (this.editPubForm.controls['type'].value == 'image') {
          formData.append('file', this.editPubForm.controls['image'].value);
        }
        else {
          formData.append('file', this.editPubForm.controls['video'].value);
        }
      }
      formData.append('type', this.editPubForm.controls['type'].value);
      if (this.editPubForm.controls['date_debut'].value > this.editPubForm.controls['date_fin'].value) {
        this.dateCompare = true;
      }
      if (this.editPubForm.controls['areas_id'].value.length) {
        for (let i = 0; i < this.editPubForm.controls['areas_id'].value.length; i++) {
          const arrayKey = `areas_id[${i}]`;
          formData.append(arrayKey, this.editPubForm.controls['areas_id'].value[i]);
        }
      }
      if (this.dateMax == false) {
        this.affichePublicitaireService.updatePosters(formData, this.pubId.id).subscribe((res: any) => {
          if (res.status == 200) {
            this.isLoader = false;
            this.success.emit();
            this.hideForm = !this.hideForm;
            this.hideTitleModal = "";
            this.submitted = false;
            this.editPubForm.reset();
            this.generateForm();
            this.isLoader = false;
            this.cancel();
            Swal.fire({
              text: "Publicité modifiée avec succès !",
              icon: 'success',
              showCancelButton: false,
              customClass: {
                confirmButton: 'btn-primary',
              }
            }).then(() => { })
          }
        },
          (error: any) => {
            this.errorMessage = error.error.message
          })
      }
    }
    else {
      this.submitted = true;

    }
  }

  processCover(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        this.editPubForm.patchValue({
          cover: selectedFile
        });
        this.coverName = selectedFile.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.coverSrc = e.target.result as string;
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }
  removeCover() {
    this.editPubForm.patchValue({
      cover: ''
    })
    this.coverName = '';
    this.coverSrc = '';
  }

  updateValidation() {
    if (this.editPubForm.controls['type'].value == 'image') {
      this.editPubForm.controls['image'].setValidators([Validators.required]);
      this.editPubForm.controls['video'].clearValidators();

    }
    else {
      this.editPubForm.controls['video'].setValidators([Validators.required]);
      this.editPubForm.controls['image'].clearValidators();
    }
    this.editPubForm.controls['image'].updateValueAndValidity();
    this.editPubForm.controls['video'].updateValueAndValidity();
  }
  processVideo(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        this.editPubForm.patchValue({
          video: selectedFile
        });
        this.videoName = selectedFile.name;
        const reader = new FileReader();
        this.videoSrc = '';
        reader.onload = (e: any) => {
          this.videoSrc = e.target.result as string;
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }

  removeVideo() {
    this.editPubForm.patchValue({
      video: ''
    })
    this.videoName = '';
    this.videoSrc = '';
  }
  get f() {
    return this.editPubForm.controls
  }
  processFile(event: any) {
    if (event.target.files[0]?.type.startsWith('image/')) {
      this.files = event.target.files[0];
      this.path = event.target.files[0].name;
      this.editPubForm.patchValue({
        image: this.files
      })
      /**
       * Format the size to a human readable string
       *
       * @param bytes
       * @returns the formatted string e.g. `105 kB` or 25.6 MB
       */
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.path = event.target.result;
        this.pathCouv = event.target.result;
        this.newPathCouverture = event.target.result as string;
      }
      reader.readAsDataURL(this.files);
    }
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

  validateDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value) {
        const date_debut = this.editPubForm?.get('date_debut')?.value
        const date_fin = this.editPubForm?.get('date_fin')?.value
        const startDate = new Date(date_debut);
        const endDate = new Date(date_fin);
        const maxYear = 2050;
        const currentYearStartDate = new Date(date_debut).getFullYear();
        const currentYearEndDate = new Date(date_fin).getFullYear();
        if (currentYearStartDate > maxYear || currentYearEndDate > maxYear) {
          this.dateMax = true;
          this.dateMessage = "La date de début et la date de fin ne doivent pas dépasser 2050"
          return { 'yearRange': true };
        }
        else if (startDate.valueOf() > endDate.valueOf()) {
          this.dateMax = true;
          this.dateMessage = "La date de début doit être supérieur à la date de fin";
          return { 'yearRange': true };
        }
        else {
          this.dateMessage = "";
          this.dateMax = false;
        }
      }
      return null;
    };
  }

  getProviders() {
    this.userService.getProviderList().subscribe(
      (res: any) => {
        this.Providers = res.body;
      }
    );
  }


  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
