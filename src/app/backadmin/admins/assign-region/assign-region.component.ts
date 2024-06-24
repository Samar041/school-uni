import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { UserService } from '../../_services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assign-region',
  templateUrl: './assign-region.component.html',
  styleUrls: ['./assign-region.component.scss']
})
export class AssignRegionComponent {
  @Input() show!: boolean
  @Input() admin!: any
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  attemptSubmission: boolean = false;
  loading: boolean = false;
  showSuccess: boolean = false;
  panelOpen = false;
  @Input() list: any;
  assignRegionForm: any = this.formBuilder.group({
    areas: [''],
  });
  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService) { }
  ngOnInit() { }
  setForm() {
    const ids = this.admin.areas
    if (ids.length)
      this.assignRegionForm.controls['areas'].setValue(ids)
  }
  get f() {
    return this.assignRegionForm.controls
  }
  submitForm() {
    this.attemptSubmission = true;
    let payload = this.assignRegionForm.value.areas.map(((i: any) => i.id));
    if (this.assignRegionForm.valid) {
      this.loading = true;
      this.userService.assignRegion(this.admin.id, { areas: payload }).subscribe((res: any) => {
        if (res.status == 200) {
          this.loading = false;
          this.success.emit();
          this.show = false;
          Swal.fire({
            text: "Régions assignés avec succès",
            icon: 'success',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        }
      },
        (error: any) => {
          this.loading = false;
        }
      );
    }
  }
  cancel() {
    this.attemptSubmission = false;
    this.showSuccess = false;
    this.assignRegionForm.reset();
    this.close.emit()
  }
  removeItem(index: any) {
    let all = this.f['areas'].value;
    all.splice(index, 1);
    this.f['areas'].setValue(all)
  }
}
