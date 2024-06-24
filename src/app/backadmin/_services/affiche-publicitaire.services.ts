import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AffichePublicitaireService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/posters`, { params: payload, observe: 'response' })
  }
  public storePosters(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/posters`, payload, { observe: 'response' })
  }
  public updatePosters(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/posters/${id}`, payload, { observe: 'response' })
  }
  public deletePubPermanantly(id: any) {
    return this.http.delete(`${this.apiUrl}/posters/${id}`, { observe: 'response' })
  }
  public getPoster(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/posters/${id}`, { observe: 'response' })

  }
}
