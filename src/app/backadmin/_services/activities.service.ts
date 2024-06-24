import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/domaines`, { params: payload, observe: 'response' })
  }
  public storeActivity(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/domaines`, payload, { observe: 'response' })
  }
  public updateActivity(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/domaines/${id}`, payload, { observe: 'response' })
  }
  public deleteActivity(id: any) {
    return this.http.delete(`${this.apiUrl}/domaines/${id}`, { observe: 'response' })
  }
  public getListSpecialites(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/specialities`, { params: payload, observe: 'response' })
  }
  public storeSpecialite(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/specialities`, payload, { observe: 'response' })
  }
  public updateSpecialite(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/specialities/${id}`, payload, { observe: 'response' })
  }
  public deleteSpecialite(id: any) {
    return this.http.delete(`${this.apiUrl}/specialities/${id}`, { observe: 'response' })
  }
  public getListSpecialitesByDomaines(): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/domainess/specialities`, {}, { observe: 'response' })
  }

  public getListArea(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/areas`, { observe: 'response' })
  }
}
