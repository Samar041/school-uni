import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../_services/users.service';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  @Input() show!: boolean;
  @Input() admin!: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  attemptSubmission: boolean = false;
  loading: boolean = false;
  showSuccess: boolean = false;
  updatePasswordForm: any = this.formBuilder.group({
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    new_password_confirmation: [
      '',
      [Validators.required, this.confirmPassword()],
    ],
  });
  showingPassword: boolean = false;
  showingOldPassword: boolean = false;
  passwordLenght = 12;
  newPassword = '';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService
  ) {}
  generatePassword() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var newPassword = '';
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += possible[Math.floor(Math.random() * possible.length)];
    }
    this.newPassword = newPassword;
    if (this.newPassword) {
      this.updatePasswordForm.patchValue({
        new_password: this.newPassword,
        new_password_confirmation: this.newPassword,
      });
    }
  }
  password() {
    this.showingPassword = !this.showingPassword;
  }
  oldPassword() {
    this.showingOldPassword = !this.showingOldPassword;
  }
  confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var password_confirm = control.value;
      try {
        var password = this.updatePasswordForm.get('new_password')?.value;
      } catch (err) {}
      if (password === password_confirm) return null;
      return { password_mismatch: true };
    };
  }
  submitForm() {
    this.attemptSubmission = true;
    let payload = this.updatePasswordForm.value;
    if (this.updatePasswordForm.valid) {
      this.loading = true;
      // this.userService.changePassword(this.admin.id, payload).subscribe((res: any) => {
      //   if (res.status == 200) {
      //     // this.showSuccess = true;
      //     this.loading = false;
      //     this.cancel();
      //     Swal.fire({
      //       text: "mot de passe modifié avec success",
      //       icon: 'success',
      //       showCancelButton: false,
      //       customClass: {
      //         confirmButton: 'btn-primary',
      //       }
      //     })
      //   }
      // },
      //   (error: any) => {
      //     this.loading = false;
      //   }
      // );
    }
  }
  cancel() {
    this.attemptSubmission = false;
    this.showSuccess = false;
    this.updatePasswordForm.reset();
    this.showingPassword = false;
    this.close.emit();
  }
  updateValidation() {
    this.updatePasswordForm.controls[
      'new_password_confirmation'
    ].updateValueAndValidity();
  }
}
