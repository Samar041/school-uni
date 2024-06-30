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
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';
import {
  getFileNameFromPath,
  objectToFormData,
} from './../../shared/utils/utils';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() specialites: any;
  @Input() entreprise: any = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  updateProviderForm: UntypedFormGroup = this.generateForm();
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
  types = [
    { label: 'EL', value: 'Entreprise individuelle' },
    {
      label: 'EIRL',
      value: 'Entreprise individuelle à responsabilité limitée',
    },
    {
      label: 'EURL',
      value: 'Entreprise unipersonnelle à responsabilité limitée',
    },
    { label: 'SARL', value: 'Société à responsabilité limitée' },
    { label: 'SAS', value: 'Société par actions simplifiée' },
    { label: 'SA', value: 'Société anonyme' },
    { label: 'Entreprise publique', value: 'Entreprise publique' },
    { label: 'ESS', value: 'Économie sociale et solidaire' },
    { label: 'Micro-entreprise', value: 'Micro-entreprise' },
    { label: 'Auto-entrepreneur', value: 'Auto-entrepreneur' },
  ];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.France];
  emailInalid: boolean = false;
  imageUrl: any;
  imageName: any;
  defaultSelection: any;
  fileUrl: any = '';
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
    this.imageName = getFileNameFromPath(this.entreprise.image);
    this.imageUrl = this.entreprise.image;
    this.fileUrl = this.entreprise.file;
    this.defaultSelection = [];
    this.specialites.map((item: any) => {
      if (this.entreprise.domaines.find((i: any) => i.id === item.data.id)) {
        this.defaultSelection.push(item);
      }
      if (item.children.length) {
        item.children.map((c: any) => {
          if (
            this.entreprise.specialities.find((i: any) => i.id === c.data.id)
          ) {
            this.defaultSelection.push(c);
          }
        });
      }
    });
    this.updateProviderForm.setValue({
      last_name: this.entreprise.last_name,
      first_name: this.entreprise.first_name,
      gender: this.entreprise.gender,
      phone: this.entreprise.phone,
      email: this.entreprise.email,
      societe: this.entreprise.societe,
      image: '',
      file: '',
      type_pro: this.entreprise.type_pro,
      domaine_id: this.entreprise.domaines.map((i: any) => i.id),
      domaines: this.defaultSelection,
      speciality_id: this.entreprise.specialities.map((i: any) => i.id),
      experience: this.entreprise.experience,
      certification: this.entreprise.certification,
      description: this.entreprise.description,
    });
  }
  generateForm() {
    return this.formBuilder.group({
      last_name: [this.entreprise.last_name, Validators.required],
      first_name: [this.entreprise.first_name, Validators.required],
      gender: [this.entreprise.gender, Validators.required],
      phone: [this.entreprise.gender, Validators.required],
      societe: [this.entreprise.societe, Validators.required],
      image: [''],
      file: [''],
      type_pro: ['', Validators.required],
      domaine_id: ['', Validators.required],
      domaines: [null, Validators.required],
      speciality_id: [''],
      experience: ['', Validators.required],
      certification: ['', Validators.required],
      description: [''],
      email: [
        this.entreprise.email,
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
    return this.updateProviderForm.controls;
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateProviderForm.patchValue({
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
  attemptUpdateProvider(event: any) {
    this.attemptSubmission = true;
    if (this.updateProviderForm.valid && this.imageUrl) {
      let form = this.updateProviderForm.value;
      if (form.phone.e164Number) {
        form.phone = form.phone.e164Number;
      }
      if (!form.image) {
        delete form.image;
      }
      if (!form.file) {
        delete form.file;
      }
      if (!this.fileUrl) {
        form.delete_file = 1;
      }
      delete form.domaines;
      form['role[0]'] = 'prestataire';
      this.loading = true;
      const formData = objectToFormData(form);
      if (!form.speciality_id?.length) {
        formData.append('speciality_id', '');
      }
      // this.userService.updateUser(formData, this.entreprise.id).subscribe(
      //   (res: any) => {
      //     this.show = false;
      //     Swal.fire({
      //       text: 'Prestataire modifié avec succès',
      //       icon: 'success',
      //       showCancelButton: false,
      //       customClass: {
      //         confirmButton: 'btn-primary',
      //       },
      //     }).then(() => {
      //       this.updateProviderForm = this.generateForm();
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
  getSelectedValues(
    event: any,
    treeSelectSelection: any = this.f['domaines'].value
  ) {
    let parents = treeSelectSelection.filter((item: any) => !item.parent);
    parents = parents.map((i: any) => i.data.id);
    let parents_selectedChildren = treeSelectSelection.filter(
      (item: any) => item.parent
    );
    let parent_ids = parents_selectedChildren.map((i: any) => i.parent.data.id);
    parent_ids = [...new Set([...parent_ids, ...parents])];
    let childs = parents_selectedChildren.map((i: any) => i.data.id);
    this.f['domaine_id'].setValue(parent_ids);
    this.f['speciality_id'].setValue(childs);
  }
  uploadFile(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateProviderForm.patchValue({
        file: fileList[0],
      });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.fileUrl = reader.result;
      };
    }
    event.currentTarget.value = '';
  }
  removeFile() {
    this.fileUrl = '';
    this.f['file'].setValue('');
  }
}
