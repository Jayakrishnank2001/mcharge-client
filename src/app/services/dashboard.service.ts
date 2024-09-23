import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class DashboardService {

  baseURL = environments.baseURL

  constructor(private readonly _http: HttpClient) { }

  ownerCount(): Observable<any> {
    return this._http.post<any>(`${this.baseURL}/owner_count`,{});
  }

  stationCount(): Observable<any> {
    return this._http.post<any>(`${this.baseURL}/station_count`,{});
  }

}
