import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { RegionService } from '../../_services/regions.service';
import { objectToFormData, stringToSlug } from './../../shared/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.scss']
})
export class UpdateRegionComponent {
  @Input()
  set selectedRegion(value: any) {
    if (value) {
      this.generateForm(value)
    }
  };
  @Input() show!: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  files: any = [];
  titre = true;
  path: any = false;
  updateRegionForm!: UntypedFormGroup;
  submitted = false;
  errorMessage = null;
  hideForm = false;
  refreshRegion: boolean = false;
  nameExisted: boolean = false;
  loading = false;
  constructor(public regionService: RegionService, public translate: TranslateService, private formBuilder: UntypedFormBuilder) { }
  get f() {
    return this.updateRegionForm?.controls
  }
  generateForm(value: any) {
    this.updateRegionForm = this.formBuilder.group({
      name: [value.name, Validators.required],
      image: [null],
      id: [value.id],
      point: [value.point, Validators.required]
    });
    this.path = value.image;
  }
  processFile(event: any): void {
    this.files = event.target.files[0];
    this.path = event.target.files[0].name;
    this.updateRegionForm.patchValue({
      image: this.path
    })
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.path = event.target.result;
    }
    reader.readAsDataURL(this.files);
  }
  uploadImage(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateRegionForm.patchValue({
        image: fileList[0]
      })
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.path = reader.result;
      }
    }
    event.currentTarget.value = '';
  }
  removeThumbnail() {
    this.path = "";
    this.f['image'].setValue(null);
  }
  regionSubmit() {
    this.submitted = true;
    if (this.updateRegionForm.valid && this.path) {
      this.loading = true;
      let form = { ...this.updateRegionForm.value }
      let slug = stringToSlug(form.name);
      form.slug = slug;
      form.level = 1;
      if (!form.image) {
        delete form.image;
      }
      const formData = objectToFormData(form);
      this.regionService.upadateRegion(formData, form.id).subscribe((res: any) => {
        this.loading = false;
        this.success.emit();
        Swal.fire({
          text: "Région modifié avec success",
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        })
      })
    }
  }
  cancel() {
    this.submitted = false;
    this.updateRegionForm.reset();
    this.path = "";
    this.close.emit();
  }
}
