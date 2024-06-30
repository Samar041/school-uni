import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  resetPasswordForm!: UntypedFormGroup;
  data: any;
  dataId: any;
  role: any;
  permissions: any;
  errorMessage = null;
  submitted = false;
  dataDecrypted: any;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private titleService: Title,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initResetPasswordForm();
    this.titleService.setTitle('backadmin');
  }
  resetPassword(): void {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      const body = this.resetPasswordForm.value;
      // this.authService.resetPassword(body).subscribe((res: any) => {
      //   this.router.navigate(['login'], { replaceUrl: true });
      //   this.errorMessage = null;
      // },
      // (err: HttpErrorResponse) => {
      //   this.errorMessage != true;
      //   this.setErrors(err);
      // });
    }
  }
  /*** Init login form*/
  private initResetPasswordForm() {
    this.resetPasswordForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            ,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        token: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{4}\\-[0-9]{3}\\-[0-9]{4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }
  checkPasswords: Validators = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group?.get('password')?.value;
    let confirmPass = group?.get('password_confirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
  get f() {
    return this.resetPasswordForm.controls;
  }
  /**
   * Set authentication errors
   *
   * @param err
   */
  private setErrors(err: HttpErrorResponse) {
    if (!err.error.success) {
      // this.resetPasswordForm.controls['email'].setErrors({ 'auth': true });
      // this.resetPasswordForm.controls['token'].setErrors({ 'auth': true });
    } else {
    }
  }
  forget() {
    this.router.navigate(['forget'], { replaceUrl: true });
  }
}
