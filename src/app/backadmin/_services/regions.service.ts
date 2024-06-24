import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Area } from 'src/app/models/area.model';
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getList(payload: any): any {
    return this.http.get(`${this.apiUrl}/areas`, { params: payload, observe: 'response' })
  }
  public getAreas(payload: any): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.apiUrl}/areas`, { observe: 'body', responseType: 'json' });
  }
  public addRegion(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/areas`, payload, { observe: 'response' })
  }
  public upadateRegion(payload: any, id: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/areas/${id}`, payload, { observe: 'response' })
  }
  public deleteRegion(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/areas/${id}`, { observe: 'response' })
  }
}
