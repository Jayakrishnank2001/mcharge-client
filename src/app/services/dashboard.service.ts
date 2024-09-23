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

  ownerCount(token: string): Observable<any> {
    // Set headers to 'application/x-www-form-urlencoded'
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Prepare the body as a URL-encoded string
    const body = `token=${encodeURIComponent(token)}`;

    // Make the POST request
    return this._http.post<any>(`${this.baseURL}/owner_count`, body, { headers });
  }

}
