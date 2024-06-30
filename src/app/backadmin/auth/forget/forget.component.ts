import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent {
  forgetPasswordForm!: UntypedFormGroup;
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
    this.initLoginForm();
    this.titleService.setTitle('backadmin');
  }
  forgetPassword(): void {
    this.submitted = true;
    // this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe(
    //   (res: any) => {
    //     if (res.status === 200) this.errorMessage = null;
    //     // this.submitted = false;
    //     this.router.navigate(['reset'], { replaceUrl: true });
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.errorMessage != true;
    //     this.setErrors(err);
    //   }
    // );
  }
  /*** Init login form*/
  private initLoginForm() {
    this.forgetPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          ,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  get f() {
    return this.forgetPasswordForm.controls;
  }
  /**
   * Set authentication errors
   *
   * @param err
   */
  private setErrors(err: HttpErrorResponse) {
    if (!err.error.success) {
      this.forgetPasswordForm.controls['email'].setErrors({ auth: true });
    } else {
    }
  }
}
