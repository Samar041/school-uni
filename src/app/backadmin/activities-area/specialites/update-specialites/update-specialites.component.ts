import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { UserService } from '../../../_services/users.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { getFileNameFromPath, objectToFormData } from './../../../shared/utils/utils'
import { ActivitiesService } from '../../../_services/activities.service';

@Component({
  selector: 'app-update-specialites',
  templateUrl: './update-specialites.component.html',
  styleUrls: ['./update-specialites.component.scss']
})
export class UpdateSpecialitesComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() item: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  editSpecialieForm: UntypedFormGroup = this.generateForm();
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
  imageName: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private activitiesService: ActivitiesService
  ) { }
  generateForm() {
    return this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['']
    });
  }
  setForm() {
    this.editSpecialieForm.setValue({
      nom: this.item.nom,
      image: '',
    });
    this.imageName = getFileNameFromPath(this.item.image)
    this.imageUrl = this.item.image
  }
  cancel() {
    this.editSpecialieForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false
    this.emailExists = false;
    this.imageUrl = "";
    this.close.emit();
  }
  get f() {
    return this.editSpecialieForm.controls
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.editSpecialieForm.patchValue({
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
  attemptUpdateSpecialities(event: any) {
    this.attemptSubmission = true;
    if (this.editSpecialieForm.valid && this.imageUrl) {
      let form = this.editSpecialieForm.value;
      if (!form.image) {
        delete form.image;
      }
      form.domaine_id = this.item.domaine.id;
      const formData = objectToFormData(form);
      this.loading = true
      this.activitiesService.updateSpecialite(formData, this.item.id).subscribe((res: any) => {
        this.show = false;
        Swal.fire({
          text: 'Spécialité modifié avec success',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.editSpecialieForm = this.generateForm();
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
