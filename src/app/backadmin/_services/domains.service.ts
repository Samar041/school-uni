import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getListPaginator(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/domaines`, { params: payload, observe: 'response' })
  }
  public getList(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/domaines`, {  observe: 'response' })
  }
  public storeDomaines(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/domaines`, payload, { observe: 'response' })
  }
  public updateDomaines(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/domaines/${id}`, payload, { observe: 'response' })
  }
  public deleteDomaines(id: any) {
    return this.http.delete(`${this.apiUrl}/domaines/${id}`, { observe: 'response' })
  }
  public getDomaines(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/domaines/${id}`, { observe: 'response' })

  }
}
