import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { UserService } from '../../_services/users.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { objectToFormData } from './../../shared/utils/utils'
import { ActivitiesService } from '../../_services/activities.service';


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addActivityForm: UntypedFormGroup = this.generateForm();
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
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private activitiesService: ActivitiesService
  ) { }
  generateForm() {
    return this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  cancel() {
    this.addActivityForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.emailExists = false;
    this.imageUrl = "";
    this.close.emit();
  }
  get f() {
    return this.addActivityForm.controls
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.addActivityForm.patchValue({
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
  attemptAddClient(event: any) {
    this.attemptSubmission = true;
    if (this.addActivityForm.valid) {
      let form = this.addActivityForm.value;     
      const formData = objectToFormData(form);
      this.loading = true
      this.activitiesService.storeActivity(formData).subscribe((res: any) => {
        this.show = false;
        Swal.fire({
          text: 'Domaine d\'activités ajouté avec success',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.addActivityForm = this.generateForm();
          this.showSuccess = false;
          this.loading = false
          this.success.emit();
          this.attemptSubmission = false;
        })
      },
        (res: any) => {
          this.loading = false;        
        }
      )
    }
  }
}
