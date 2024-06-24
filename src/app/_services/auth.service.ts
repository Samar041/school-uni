import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${environment.apiUrl}`;
  authUrl = `${environment.authUrl}`;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private localstorageService: LocalStorageService
  ) {}
  async firebaseLogin(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (userCredential.user) {
         userCredential.user.getIdToken().then((value: any) => {
          this.localstorageService.setAdminToken(value);
          this.localstorageService.setAdminRole('admin');
          this.router.navigate(['/']);
          
        });
      }
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  }
  async firebaseRegister(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.error('Error registering: ', error);
    }
  }

  async firebaseLogout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  }
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // private async saveUserData(user: any) {
  //   if (user) {
  //     const userRef = doc(this.firestore, `users/${user.uid}`);
  //     const userData = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //       emailVerified: user.emailVerified,
  //     };
  //     await setDoc(userRef, userData, { merge: true });
  //   }
  // }

  async getToken(user: User | null): Promise<string | undefined> {
    if (user) {
      return await user.getIdToken();
    }
    return undefined;
  }

  login(formData: any) {
    return this.http
      .post(`${this.authUrl}/login`, formData, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
  forgetPassword(formData: any) {
    return this.http
      .post(`${this.authUrl}/forgot-password`, formData, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }
  resetPassword(formData: any) {
    return this.http
      .post(`${this.authUrl}/reset-password`, formData, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
  getIsAuth() {
    return !!this.localstorageService.getAdminToken();
  }
  logOut() {
    this.localstorageService.clear();
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
  get admin() {
    const user: string = this.localstorageService.getAdmin() as string;
    return JSON.parse(user);
  }
}
