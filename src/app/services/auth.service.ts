import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { IUser } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environments.baseURL
  private SALT_KEY = environments.SALT_KEY

  constructor(private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  userLogin(formData: IUser): Observable<any> {
    const authcode = CryptoJS.SHA1(this.SALT_KEY + formData.userName).toString();

    const body = new URLSearchParams();
    body.set('authcode', authcode);
    body.set('userName', formData.userName);
    body.set('password', formData.password);
    body.set('device_type', '1-android');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this._http.post(`${this.baseURL}/login`, body.toString(), { headers });
  }


  userSignup(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.baseURL}/signup`, formData);
  }

  setToken(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value)
    }
  }

  getToken(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key)
    }
    return null
  }

  clearToken(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key)
    }
  }





}




