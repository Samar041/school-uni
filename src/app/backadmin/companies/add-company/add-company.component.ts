import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { objectToFormData } from './../../shared/utils/utils';
import { ActivitiesService } from '../../_services/activities.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() specialites: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addClientForm: UntypedFormGroup = this.generateForm();
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
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.France];
  imageUrl: any;
  fileUrl: any;
  types = [
    { 'label': 'EL', 'value': 'Entreprise individuelle(EI)' },
    { 'label': 'EIRL', 'value': 'Entreprise individuelle à responsabilité limitée(EIRL)' },
    { 'label': 'EURL', 'value': 'Entreprise unipersonnelle à responsabilité limitée(EURL)' },
    { 'label': 'SARL', 'value': 'Société à responsabilité limitée(SARL)' },
    { 'label': 'SAS', 'value': 'Société par actions simplifiée(SAS)' },
    { 'label': 'SA', 'value': 'Société anonyme(SA)' },
    { 'label': 'Entreprise publique', 'value': 'Entreprise publique(EP)' },
    { 'label': 'ESS', 'value': 'Économie sociale et solidaire(ESS)' },
    { 'label': 'Micro-entreprise', 'value': 'Micro-entreprise' },
    { 'label': 'Auto-entrepreneur', 'value': 'Auto-entrepreneur' }
  ];
  domaines = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    public translate: TranslateService,
    private activitiesService: ActivitiesService
  ) { }
  ngOnInit() {
  }
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
      societe: ['', Validators.required],
      image: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      statut_pro: ['PENDING', Validators.required],
      type_pro: ['', Validators.required],
      domaine_id: ['', Validators.required],
      domaines: [null, Validators.required],
      speciality_id: [''],
      experience: ['', Validators.required],
      certification: ['', Validators.required],
      description: [''],
      file: [''],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [this.confirmPassword(), Validators.required]],
    });
  }

  cancel() {
    this.addClientForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.emailExists = false;
    this.imageUrl = "";
    this.fileUrl = "";
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
      this.addClientForm.patchValue({
        password: this.newPassword,
        password_confirmation: this.newPassword
      })
    }
  }
  confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var password_confirm = control.value
      try {
        var password = this.addClientForm?.get('password')?.value
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
    return this.addClientForm.controls
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.addClientForm.patchValue({
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
  uploadFile(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.addClientForm.patchValue({
        file: fileList[0]
      })
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.fileUrl = reader.result;
      }
    }
    event.currentTarget.value = '';
  }
  removeThumbnail() {
    this.imageUrl = "";
    this.f['image'].setValue("");
  }
  removeFile() {
    this.fileUrl = "";
    this.f['file'].setValue("");
  }
  attemptAddClient(event: any) {
    this.attemptSubmission = true;
    if (this.addClientForm.valid) {
      let form = this.addClientForm.value;
      if (form.phone.e164Number) {
        form.phone = form.phone.e164Number
      }
      form.role = ["prestataire"];
      form.prix = "";
      delete form.domaines;
      const formData = objectToFormData(form);
      this.loading = true;
      if (!form.speciality_id?.length) {
        formData.append('speciality_id', '')
      }
      this.userService.storeUser(formData).subscribe((res: any) => {
        this.show = false;
        Swal.fire({
          text: 'Prestataire ajouté avec succès',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.addClientForm = this.generateForm();
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
  getSelectedValues(event: any, treeSelectSelection: any = this.f['domaines'].value) {
    let parents = treeSelectSelection.filter((item: any) => !item.parent);
    parents = parents.map((i: any) => i.data.id);
    let parents_selectedChildren = treeSelectSelection.filter((item: any) => item.parent)
    let parent_ids = parents_selectedChildren.map((i: any) => i.parent.data.id);
    parent_ids = [...new Set([...parent_ids, ...parents])];
    let childs = parents_selectedChildren.map((i: any) => i.data.id);
    this.f['domaine_id'].setValue(parent_ids);
    this.f['speciality_id'].setValue(childs);
  }
  updateValidation() {
    this.f['new_password_confirmation'].updateValueAndValidity()
  }
}
