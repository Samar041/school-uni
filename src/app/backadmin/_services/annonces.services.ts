import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/announces`, { params: payload, observe: 'response' })
  }
  public storeAnnounce(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/announces`, payload, { observe: 'response' })
  }
  public updateAnnounce(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/announces/${id}`, payload, { observe: 'response' })
  }
  public deleteAnnounce(id: any) {
    return this.http.delete(`${this.apiUrl}/announces/${id}`, { observe: 'response' })
  }
  public getAreas(): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/areas`, { observe: 'response' })
  }
  public getAnnounce(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/announces/${id}`, { observe: 'response' })

  }
}
