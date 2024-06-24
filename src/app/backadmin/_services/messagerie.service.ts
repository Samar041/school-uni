import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public sendMessage(payload: any,id:number): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/reply/${id}`, payload, { observe: 'response' })
  }
  public maskRead(id: any) {
    return this.http.post(`${this.apiUrl}/mark-read/${id}`, { observe: 'response' })
  }
  public getMessages() {
    return this.http.get(`${this.apiUrl}/messages`, { observe: 'response' })
  }
  getMessageById(id:number){
    return this.http.get(`${this.apiUrl}/messages/${id}`, { observe: 'response' })
  }
  deleteMessage(id:number){
    return this.http.delete(`${this.apiUrl}/messages/${id}`, { observe: 'response' })
  }
}
