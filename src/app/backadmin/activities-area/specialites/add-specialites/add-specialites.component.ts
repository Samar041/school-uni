import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { objectToFormData } from './../../../shared/utils/utils'
import { ActivitiesService } from '../../../_services/activities.service';

@Component({
  selector: 'app-add-specialites',
  templateUrl: './add-specialites.component.html',
  styleUrls: ['./add-specialites.component.scss']
})
export class AddSpecialitesComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() id: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addSpecialiteForm: UntypedFormGroup = this.generateForm();
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
    this.addSpecialiteForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.emailExists = false;
    this.imageUrl = "";
    this.close.emit();
  }
  get f() {
    return this.addSpecialiteForm.controls
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.addSpecialiteForm.patchValue({
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
    if (this.addSpecialiteForm.valid) {
      let form = this.addSpecialiteForm.value;
      form.domaine_id = this.id;
      const formData = objectToFormData(form);
      this.loading = true
      this.activitiesService.storeSpecialite(formData).subscribe((res: any) => {
        this.show = false;
        Swal.fire({
          text: 'Spécialité ajouté avec success',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.addSpecialiteForm = this.generateForm();
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
