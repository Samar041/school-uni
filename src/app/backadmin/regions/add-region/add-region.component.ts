import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { RegionService } from '../../_services/regions.service';
import { objectToFormData, stringToSlug } from './../../shared/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent {
  @Input()
  set selectedZone(value: any) {
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
  createRegionForm!: UntypedFormGroup;
  submitted = false;
  errorMessage = null;
  hideForm = false;
  refreshRegion: boolean = false;
  nameExisted: boolean = false;
  loading = false;
  constructor(public regionService: RegionService, public translate: TranslateService, private formBuilder: UntypedFormBuilder) { }
  get f() {
    return this.createRegionForm?.controls
  }
  generateForm(value: any) {
    this.createRegionForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      point: [value, Validators.required]
    });
  }
  processFile(event: any): void {
    this.files = event.target.files[0];
    this.path = event.target.files[0].name;
    this.createRegionForm.patchValue({
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
      this.createRegionForm.patchValue({
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
    this.f['image'].setValue("");
  }
  regionSubmit() {
    this.submitted = true;
    if (this.createRegionForm.valid) {
      this.loading = true;
      let form = { ...this.createRegionForm.value }
      let slug = stringToSlug(form.name);
      form.slug = slug;
      form.level = 1;
      const formData = objectToFormData(form);
      this.regionService.addRegion(formData).subscribe((res: any) => {
        this.loading = false;
        this.success.emit();
        Swal.fire({
          text: "Région ajouté avec success",
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
    this.createRegionForm.reset();
    this.path = "";
    this.close.emit();
  }
}
