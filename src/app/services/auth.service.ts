import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { IUser } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environments.baseURL

  constructor(private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  userLogin(formData: FormData): Observable<any> {
    return this._http.post(`${this.baseURL}/login`,formData);
  }

  userSignup(formData: IUser): Observable<any> {
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

  verifyOTP(formData:FormData) {
    return this._http.post(`${this.baseURL}/verify_otp`,formData);
  }

  resendOTP(data: { resetKey: string | null, reason: number }) {
    return this._http.post(`${this.baseURL}/resend_otp`,data)
  }
  




}




