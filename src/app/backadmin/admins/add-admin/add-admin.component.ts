import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { objectToFormData } from './../../shared/utils/utils'


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addAdminForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  showingPassword: boolean = false;
  newPassword = "";
  passwordLenght = 12;
  oldPasswordInvalid: boolean = false;
  emailExists: boolean = false;
  emailInalid: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;
  genres: any[] = [
    {
      name: 'Femme',
      value: 'femme'
    },
    {
      name: 'Homme',
      value: 'homme'
    }
  ]
  roles: any[] = [
    {
      name: 'Administrateur',
      value: 'admin'
    },
    {
      name: 'Opérateur',
      value: 'operateur'
    },
    {
      name: 'Dispatcheur',
      value: 'dispatcheur'
    },
    {
      name: 'Responsable marketing',
      value: 'commerciale'
    }
  ]
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.France];
  imageUrl: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    public translate: TranslateService,
  ) { }
  ngAfterViewChecked(): void {
    const input = document.getElementsByClassName('custom');
    if (input.length) {
      input[0].setAttribute('autocomplete', 'Nope');
    }
  }
  generateForm() {
    return this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      image: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      statut_pro: ['PENDING', Validators.required],
      type_pro: ['EL', Validators.required],
      role: ['', Validators.required],
      domaine_id: [''],
      speciality_id: [''],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [this.confirmPassword(), Validators.required]],
    });
  }
  cancel() {
    this.addAdminForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.emailExists = false;
    this.imageUrl = "";
    this.close.emit();
  }
  generatePassword() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var newPassword = '';
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += possible[Math.floor(Math.random() * possible.length)];
    }
    this.newPassword = newPassword;
    if (this.newPassword) {
      this.addAdminForm.patchValue({
        password: this.newPassword,
        password_confirmation: this.newPassword
      })
    }
  }
  confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var password_confirm = control.value
      try {
        var password = this.addAdminForm?.get('password')?.value
      } catch (err) {
        console.error(err)
      }
      if (password === password_confirm) return null
      return { password_mismatch: true }
    }
  }
  password() {
    this.showingPassword = !this.showingPassword;
  }
  get f() {
    return this.addAdminForm.controls
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.addAdminForm.patchValue({
        image: fileList[0]
      })
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      }
    }
    event.currentTarget.value = '';
  }
  removeThumbnail() {
    this.imageUrl = "";
    this.f['image'].setValue("");
  }
  attemptAddAdmin(event: any) {
    this.attemptSubmission = true;
    if (this.addAdminForm.valid) {
      let form = this.addAdminForm.value;
      if (form.phone.e164Number) {
        form.phone = form.phone.e164Number
      }
      form.role = [form.role];
      form.description = "";
      form.experience = "";
      form.certification = "";
      form.prix = "";
      const formData = objectToFormData(form);
      this.loading = true
      this.userService.storeUser(formData).subscribe((res: any) => {
        this.show = false;
        Swal.fire({
          text: this.translate.instant('ADMINS.ADD_ADMIN'),
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.addAdminForm = this.generateForm();
          this.showSuccess = false;
          this.loading = false
          this.success.emit();
          this.attemptSubmission = false;
        })
      },
        (res: any) => {
          this.loading = false
          if (res.status === 422) {
            if (res.error.message == "The email has already been taken.") {
              this.emailExists = true
            }
            else if (res.error.message == "The email field must be a valid email address.") {
              this.emailInalid = true
            }
          }
        }
      )
    }
  }
  updateValidation() {
    this.f['password_confirmation'].updateValueAndValidity()
  }
}
