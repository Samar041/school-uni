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

  
}
