import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PromosService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/promos`, { params: payload, observe: 'response' })
  }
  public storePromos(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/promos`, payload, { observe: 'response' })
  }
  public updatePromos(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/promos/${id}`, payload, { observe: 'response' })
  }
  public deletePromos(id: any) {
    return this.http.delete(`${this.apiUrl}/promos/${id}`, { observe: 'response' })
  }
  public getPromos(id: any) {
    return this.http.get(`${this.apiUrl}/promos/${id}`, { observe: 'response' })
  }

}
