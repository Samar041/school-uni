import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/demandes`, { params: payload, observe: 'response' })
  }
  public storeDemande(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/demandes`, payload, { observe: 'response' })
  }
  public updateDemande(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/demandes/${id}`, payload, { observe: 'response' })
  }
  public deleteDemande(id: any) {
    return this.http.delete(`${this.apiUrl}/demandes/${id}`, { observe: 'response' })
  }

  public softDeleteDemande(id: any) {
    return this.http.delete(`${this.apiUrl}/demandes/${id}/soft-delete`, { observe: 'response' })
  }
  public getDemande(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/demandes/${id}`, { observe: 'response' })

  }
  updateDemandeStatus(id: any, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/demandes/update-statut/${id}`, payload, { observe: 'response' })

  }

  public getDeletedDemandeList(payload: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/demandes/trashed`, { params: payload, observe: 'response' })
  }

  public restaurer(id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/demandes/${id}/restore`, {}, { observe: 'response' })
  }
}
