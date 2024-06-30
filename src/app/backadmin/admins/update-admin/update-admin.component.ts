import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { UserRole, UserService } from '../../_services/users.service';
import {
  getFileNameFromPath,
  objectToFormData,
} from './../../shared/utils/utils';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss'],
})
export class UpdateAdminComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() admin: any = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();

  updateAdminForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;
  genres: any[] = [
    {
      name: 'Femme',
      value: 'femme',
    },
    {
      name: 'Homme',
      value: 'homme',
    },
  ];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.France];
  emailInalid: boolean = false;
  imageUrl: any;
  imageName: any;
  roles: any[] = [
    {
      name: UserRole.Admin,
      value: UserRole.Admin,
    },
    {
      name: UserRole.Prof,
      value: UserRole.Prof,
    },
    {
      name: UserRole.Student,
      value: UserRole.Student,
    }
  ];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    public translate: TranslateService
  ) {}
  ngAfterViewChecked(): void {
    const input = document.getElementsByClassName('custom');
    if (input.length) {
      input[0].setAttribute('autocomplete', 'Nope');
    }
  }
  setAdmin() {
    this.updateAdminForm.setValue({
      last_name: this.admin.last_name,
      first_name: this.admin.first_name,
      gender: this.admin.gender,
      phone: this.admin.phone,
      email: this.admin.email,
      image: '',
      role: this.admin.role,
    });
    this.imageName = getFileNameFromPath(this.admin.image);
    this.imageUrl = this.admin.image;
  }
  generateForm() {
    return this.formBuilder.group({
      last_name: [this.admin.last_name, Validators.required],
      first_name: [this.admin.first_name, Validators.required],
      gender: [this.admin.gender, Validators.required],
      phone: [this.admin.gender, Validators.required],
      image: [''],
      role: ['', Validators.required],
      email: [
        this.admin.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  cancel() {
    this.showSuccess = false;
    this.emailExists = false;
    this.loading = false;
    this.imageUrl = '';
    this.attemptSubmission = false;
    this.close.emit();
  }
  get f() {
    return this.updateAdminForm.controls;
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateAdminForm.patchValue({
        image: fileList[0],
      });
      this.imageName = '';
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      };
    }
    event.currentTarget.value = '';
  }
  removeThumbnail() {
    this.imageUrl = '';
    this.f['image'].setValue('');
  }
  attemptUpdateAdmin(event: any) {
    this.attemptSubmission = true;
    if (this.updateAdminForm.valid && this.imageUrl) {
      let form = this.updateAdminForm.value;
      if (form.phone.e164Number) {
        form.phone = form.phone.e164Number;
      }
      if (!form.image) {
        delete form.image;
      }
      form.role = [form.role];
      this.loading = true;
      const formData = objectToFormData(form);
      // this.userService.updateUser(formData, this.admin.id).subscribe((res: any) => {
      //   this.show = false;
      //   Swal.fire({
      //     text: this.translate.instant('ADMINS.EDIT_ADMIN'),
      //     icon: 'success',
      //     showCancelButton: false,
      //     customClass: {
      //       confirmButton: 'btn-primary',
      //     }
      //   }).then(() => {
      //     this.updateAdminForm = this.generateForm();
      //     this.showSuccess = false;
      //     this.loading = false;
      //     this.success.emit();
      //   })
      // },
      //   (res: any) => {
      //     this.loading = false;
      //     if (res.status === 422) {
      //       if (res.error.errors.email) { this.emailExists = true }
      //       if (res.error.errors.phone) { this.phoneExists = true }
      //     }
      //   }
      // )
    }
  }
}
