import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  getParkingReport(page: number, size: number) {
    return this._http.post(`${this.baseURL}/parking_history_report?page=${page}&size=${size}`, {})
  }


}
