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
import { ActivitiesService } from '../../_services/activities.service';
import { AffichePublicitaireService } from '../../_services/affiche-publicitaire.services';
import { UserService } from '../../_services/users.service';
@Component({
  selector: 'app-add-pub',
  templateUrl: './add-pub.component.html',
  styleUrls: ['./add-pub.component.scss'],
})
export class AddPubComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() list: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  showSuccess: boolean = false;
  createPubForm = this.generateForm();
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
  hideTitleModal = this.translate.instant('NOTIFICATION.ADD_PUB_TITLE');
  hideForm = false;
  errorMessage = null;
  listArea: any;
  statusList: any = [
    { id: 1, name: 'PROGRAM' },
    { id: 2, name: 'ENCOURS' },
    { id: 3, name: 'CLOTURE' },
  ];
  usersList: any = [
    { id: 1, name: 'user1' },
    { id: 2, name: 'user2' },
    ,
    { id: 3, name: 'user3' },
  ];
  dateMessage = '';
  Providers: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public affichePublicitaire: AffichePublicitaireService,
    public adsAreaService: ActivitiesService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.generateForm();
    this.getProviders();
  }
  generateForm() {
    return this.formBuilder.group({
      type: ['image'],
      date_debut: ['', [Validators.required, this.validateDate()]],
      date_fin: ['', [Validators.required, this.validateDate()]],
      montant: [''],
      user_id: [''],
      image: [''],
      video: [''],
      cover: [''],
      areas_id: [''],
    });
  }
  cancel() {
    this.createPubForm = this.generateForm();
    this.showSuccess = false;
    this.close.emit();
  }
  pubSubmit() {
    this.submitted = true;
    if (this.createPubForm.valid) {
      this.submitted = false;
      const formData = new FormData();
      formData.append(
        'date_debut',
        this.createPubForm.controls['date_debut'].value + 'T00:00'
      );
      formData.append(
        'date_fin',
        this.createPubForm.controls['date_fin'].value + 'T23:59'
      );
      formData.append('user_id', this.createPubForm.controls['user_id'].value);
      if (this.createPubForm.controls['montant'].value == (null || undefined)) {
        formData.append('montant', '');
      } else {
        formData.append(
          'montant',
          this.createPubForm.controls['montant'].value
        );
      }
      if (this.createPubForm.controls['type'].value == 'image') {
        formData.append('file', this.createPubForm.controls['image'].value);
      } else {
        formData.append('file', this.createPubForm.controls['video'].value);
      }
      formData.append('type', this.createPubForm.controls['type'].value);

      if (
        this.createPubForm.controls['date_debut'].value >
        this.createPubForm.controls['date_fin'].value
      ) {
        this.dateCompare = true;
      }
      if (this.createPubForm.controls['areas_id'].value.length) {
        for (
          let i = 0;
          i < this.createPubForm.controls['areas_id'].value.length;
          i++
        ) {
          const arrayKey = `areas_id[${i}]`;
          formData.append(
            arrayKey,
            this.createPubForm.controls['areas_id'].value[i]
          );
        }
      }
      if (this.dateMax == false) {
        this.isLoader = true;
        this.affichePublicitaire.storePosters(formData).subscribe(
          (res: any) => {
            if (res.status == 201) {
              this.success.emit();
              this.hideForm = !this.hideForm;
              this.showSuccess = !this.showSuccess;
              this.hideTitleModal = '';
              this.submitted = false;
              this.createPubForm.reset();
              this.cancel();
              this.generateForm();
              Swal.fire({
                text: 'Publicité ajoutée avec succès !',
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

  processCover(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        this.createPubForm.patchValue({
          cover: selectedFile,
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
    this.createPubForm.patchValue({
      cover: '',
    });
    this.coverName = '';
    this.coverSrc = '';
  }

  updateValidation(event: any) {
    if (this.createPubForm.controls['type'].value == 'IMAGE') {
      this.createPubForm.controls['image'].setValidators([Validators.required]);
      this.createPubForm.controls['video'].clearValidators();
    } else {
      this.createPubForm.controls['video'].setValidators([Validators.required]);
      this.createPubForm.controls['image'].clearValidators();
    }
    this.createPubForm.controls['image'].updateValueAndValidity();
    this.createPubForm.controls['video'].updateValueAndValidity();
  }
  processVideo(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        this.createPubForm.patchValue({
          video: selectedFile,
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
    this.createPubForm.patchValue({
      video: '',
    });
    this.videoName = '';
    this.videoSrc = '';
  }
  get f() {
    return this.createPubForm.controls;
  }
  processFile(event: any) {
    if (event.target.files[0]?.type.startsWith('image/')) {
      this.files = event.target.files[0];
      this.path = event.target.files[0].name;
      this.createPubForm.patchValue({
        image: this.files,
      });
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
      };
      reader.readAsDataURL(this.files);
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
        const date_debut = this.createPubForm?.get('date_debut')?.value;
        const date_fin = this.createPubForm?.get('date_fin')?.value;
        const startDate = new Date(date_debut);
        const endDate = new Date(date_fin);
        const maxYear = 2050;
        const currentYearStartDate = new Date(date_debut).getFullYear();
        const currentYearEndDate = new Date(date_fin).getFullYear();
        if (currentYearStartDate > maxYear || currentYearEndDate > maxYear) {
          this.dateMax = true;
          this.dateMessage =
            'La date de début et la date de fin ne doivent pas dépasser 2050';
          return { yearRange: true };
        } else if (startDate.valueOf() > endDate.valueOf()) {
          this.dateMax = true;
          this.dateMessage =
            'La date de début doit être supérieur à la date de fin';
          return { yearRange: true };
        } else {
          this.dateMessage = '';
          this.dateMax = false;
        }
      }
      return null;
    };
  }
  getProviders() {
    // this.userService.getProviderList().subscribe((res: any) => {
    //   this.Providers = res.body;
    // });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
