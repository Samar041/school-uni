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
import { UserService } from '../../_services/users.service';
import {
  getFileNameFromPath,
  objectToFormData,
} from './../../shared/utils/utils';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() Client: any = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  updateClientForm: UntypedFormGroup = this.generateForm();
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
  setUser() {
    this.updateClientForm.setValue({
      last_name: this.Client.last_name,
      first_name: this.Client.first_name,
      gender: this.Client.gender,
      phone: this.Client.phone,
      email: this.Client.email,
      image: '',
    });
    this.imageName = getFileNameFromPath(this.Client.image);
    this.imageUrl = this.Client.image;
  }
  generateForm() {
    return this.formBuilder.group({
      last_name: [this.Client.last_name, Validators.required],
      first_name: [this.Client.first_name, Validators.required],
      gender: [this.Client.gender, Validators.required],
      phone: [this.Client.gender, Validators.required],
      image: [''],
      email: [
        this.Client.email,
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
    this.close.emit();
  }
  get f() {
    return this.updateClientForm.controls;
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateClientForm.patchValue({
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
  attemptUpdateClient(event: any) {
    this.attemptSubmission = true;
    if (this.updateClientForm.valid && this.imageUrl) {
      let form = this.updateClientForm.value;
      if (form.phone.e164Number) {
        form.phone = form.phone.e164Number;
      }
      if (!form.image) {
        delete form.image;
      }
      form['role[0]'] = 'client';
      this.loading = true;
      const formData = objectToFormData(form);
      // this.userService.updateUser(formData, this.Client.id).subscribe(
      //   (res: any) => {
      //     this.show = false;
      //     Swal.fire({
      //       text: this.translate.instant('USERS.EDIT_USER'),
      //       icon: 'success',
      //       showCancelButton: false,
      //       customClass: {
      //         confirmButton: 'btn-primary',
      //       },
      //     }).then(() => {
      //       this.updateClientForm = this.generateForm();
      //       this.showSuccess = false;
      //       this.loading = false;
      //       this.success.emit();
      //     });
      //   },
      //   (res: any) => {
      //     this.loading = false;
      //     if (res.status === 422) {
      //       if (res.error.errors.email) {
      //         this.emailExists = true;
      //       }
      //       if (res.error.errors.phone) {
      //         this.phoneExists = true;
      //       }
      //     }
      //   }
      // );
    }
  }
}
