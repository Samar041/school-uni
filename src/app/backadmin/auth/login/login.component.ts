import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/localstorage.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../_services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  siteUrl = `${environment.siteUrl}`;
  data: any;
  dataId: any;
  role: any;
  permissions: any;
  errorMessage = null;
  submitted = false;
  dataDecrypted: any;
  dataState!: any;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private localstorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.initLoginForm();
    this.titleService.setTitle('backadmin');
  }
  // login(): void {
  //   this.submitted = true;
  //   this.authService.login(this.loginForm.value).subscribe(
  //     (res: any) => {
  //       this.data = res.body.access_token;
  //       this.dataId = res.body.user.id;
  //       this.role = res.body.user.roles[0];
  //       this.localstorageService.setAdminToken(this.data);
  //       this.localstorageService.setAdminRole(this.role);
  //       this.localstorageService.setAdminId(this.dataId);
  //       this.localstorageService.setAdmin(JSON.stringify(res.body.user));
  //       this.router.navigate(['/']);
  //       this.errorMessage = null;
  //       this.submitted = false;
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.errorMessage != true;
  //       this.setErrors(err);
  //     }
  //   );
  // }
  login() {
    let mail = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.firebaseLogin(mail, password);
  }
  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          ,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  /**
   * Set authentication errors
   *
   * @param err
   */
  private setErrors(err: HttpErrorResponse) {
    if (!err.error.success) {
      if (err.status === 422) {
        this.dataState = 'empty';
        const errorData = err.error.error.data;
        if (errorData.email) {
          this.loginForm.controls['email'].setErrors({
            auth: true,
            required: true,
          });
        } else {
          this.loginForm.controls['email'].setErrors({ auth: true });
        }
        if (errorData.password) {
          this.loginForm.controls['password'].setErrors({
            auth: true,
            required: true,
          });
        } else {
          this.loginForm.controls['password'].setErrors({ auth: true });
        }
      }
      if (err.status === 401) {
        this.dataState = 'notEmpty';
        this.loginForm.controls['email'].setErrors({ auth: true });
        this.loginForm.controls['password'].setErrors({ auth: true });
      }
    }
  }
  forget() {
    this.router.navigate(['forget'], { replaceUrl: true });
  }
}
