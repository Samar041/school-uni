import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SuiviDemandeService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getAll(payload: any = {}): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/demandes/group-by-statut`, { params: payload, observe: 'response' })
  }
  public acceptDemande(payload: any, id: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/demandes/update-statut/${id}`, payload, { observe: 'response' })
  }
  public getPrestatairesInSameArea(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/areas/prestataires-in-same-area/${id}`, { params: {},observe: 'response' })
  }
  public assignDemande(id: any, payload:any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/demandes/${id}/affecte-prestataire-demande`, payload ,{  observe: 'response' })
  }
}
