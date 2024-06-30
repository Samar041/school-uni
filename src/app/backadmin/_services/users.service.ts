import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { doc, docData, DocumentReference, Firestore, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, collectionData, Timestamp } from  "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }

}
