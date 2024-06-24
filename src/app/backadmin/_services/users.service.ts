import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getUsersList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users`, { params: payload, observe: 'response' })
  }
  public getDeletedUsersList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/trashed/users`, { params: payload, observe: 'response' })
  }
  public getUserById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/${id}`, { observe: 'response' })
  }
  public getDeletedUserById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/trashed/users/${id}`, { observe: 'response' })
  }
  public storeUser(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users`, payload, { observe: 'response' })
  }
  public updateUser(formData: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/${id}`, formData, { observe: 'response' })
  }
  public deleteUser(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { observe: 'response' })
  }
  public deleteUserPermanantly(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/permanently-delete/user/${id}`, { observe: 'response' })
  }
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.put(`${this.apiUrl}/change-statut/user/${id}`, payload, { observe: 'response' })
  }
  public changePassword(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.put(`${this.apiUrl}/change-password/user/${id}`, payload, { observe: 'response' })
  }
  public getCompaniesList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/companies`, payload, { observe: 'response' })
  }
  public addCompany(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/companies/save`, payload, { observe: 'response' })
  }
  public deleteCompany(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/companies/${id}/delete`, { observe: 'response' })
  }
  public updateCompany(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/companies/${id}/update`, payload, { observe: 'response' })
  }
  public getCompanyById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/${id}`, { observe: 'response' })
  }
  public restaurer(id: any): Observable<HttpResponse<any>> | any {
    return this.http.put(`${this.apiUrl}/restore/users/${id}`, {}, { observe: 'response' })
  }
  public startDay(id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/start-day-admin/user/${id}`, {}, { observe: 'response' })
  }
  public endDay(id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/end-day-admin/user/${id}`, {}, { observe: 'response' })
  }
  public getProviderList(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/prestataire`, { observe: 'response' })
  }
  userFiltred(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/clients`, { params: payload, observe: 'response' })
  }
  public assignRegion(id: any, payload: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.apiUrl}/assign_area/users/${id}`, payload, { observe: 'response' })
  }
}
