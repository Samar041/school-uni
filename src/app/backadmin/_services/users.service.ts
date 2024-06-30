import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export enum UserRole {
  Student = 'student',
  Prof = 'prof',
  Admin = 'admin',
}
export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  // Add other user fields as needed
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  private storage = inject(Storage);
  private afAuth = inject(AngularFireAuth);

  private usersCollection = collection(this.firestore, 'users');

  private apiUrl = `${environment.apiUrl}`;

  constructor() {}

  async uploadImage(imageFile: File, fileRoot: string = '') {
    const filePath = fileRoot.length
      ? `profile_images/${fileRoot}/${imageFile.name}`
      : `profile_images/${imageFile.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadData = await uploadBytesResumable(storageRef, imageFile);
    const downloadUrp = getDownloadURL(uploadData.ref);
    return downloadUrp;
  }
  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
      }
    }
  }

  // Create a new user
  async createUser(user: any): Promise<DocumentReference<any>> {
    console.log(user);
    const cred = await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );

    user.password = ""; // Remove password from user object before saving
    const newUser = await addDoc(this.usersCollection, user);
    return newUser;
  }
  // Read user by id
  getUserById(userId: string): Observable<User | undefined> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<any>;
  }

  // Update user
  updateUser(userId: string, user: Partial<User>): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return updateDoc(userDocRef, user);
  }

  // Delete user
  deleteUser(userId: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return deleteDoc(userDocRef);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }
  getUsersByRole(role: UserRole): Observable<User[]> {
    const q = query(this.usersCollection, where('role', '==', role));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }
}
