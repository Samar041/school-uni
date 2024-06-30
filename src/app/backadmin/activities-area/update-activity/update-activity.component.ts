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
import Swal from 'sweetalert2';
import { ActivitiesService } from '../../_services/activities.service';
import {
  getFileNameFromPath,
  objectToFormData,
} from './../../shared/utils/utils';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss'],
})
export class UpdateActivityComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() item: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  editActivityForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  showingPassword: boolean = false;
  newPassword = '';
  passwordLenght = 12;
  oldPasswordInvalid: boolean = false;
  emailExists: boolean = false;
  emailInalid: boolean = false;
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
  imageUrl: any;
  imageName: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    private activitiesService: ActivitiesService
  ) {}
  generateForm() {
    return this.formBuilder.group({
      nom: ['', Validators.required],
      image: [''],
    });
  }
  setForm() {
    this.editActivityForm.setValue({
      nom: this.item.nom,
      image: '',
    });
    this.imageName = getFileNameFromPath(this.item.image);
    this.imageUrl = this.item.image;
  }
  cancel() {
    this.editActivityForm = this.generateForm();
    this.showSuccess = false;
    this.attemptSubmission = false;
    this.loading = false;
    this.emailExists = false;
    this.imageUrl = '';
    this.close.emit();
  }
  get f() {
    return this.editActivityForm.controls;
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.editActivityForm.patchValue({
        image: fileList[0],
      });
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
  attemptUpdateActivity(event: any) {
    this.attemptSubmission = true;
    if (this.editActivityForm.valid && this.imageUrl) {
      let form = this.editActivityForm.value;
      if (!form.image) {
        delete form.image;
      }
      const formData = objectToFormData(form);
      this.loading = true;
      this.activitiesService.updateActivity(formData, this.item.id).subscribe(
        (res: any) => {
          this.show = false;
          Swal.fire({
            text: "Domaine d'activités modifié avec success",
            icon: 'success',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.editActivityForm = this.generateForm();
            this.showSuccess = false;
            this.loading = false;
            this.success.emit();
            this.attemptSubmission = false;
          });
        },
        (res: any) => {
          this.loading = false;
        }
      );
    }
  }
}
