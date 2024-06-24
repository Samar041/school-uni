import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getConfigDemandes(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/config`, { params: {}, observe: 'response' })
  }
  public updateConfig(payload:any) {
    return this.http.post(`${this.apiUrl}/config/update-demande-config`, payload,{ observe: 'response' })
  }

}
