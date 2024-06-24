import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/specialities`, { observe: 'response' })
  }
  public getListWithPaginator(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/specialities`, { params: payload, observe: 'response' })
  }
  public storeSpecialitie(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/specialities`, payload, { observe: 'response' })
  }
  public updateSpecialities(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/specialities/${id}`, payload, { observe: 'response' })
  }
  public deleteSpecialities(id: any) {
    return this.http.delete(`${this.apiUrl}/specialities/${id}`, { observe: 'response' })
  }
  public getSpecialitie(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/specialities/${id}`, { observe: 'response' })

  }
}
