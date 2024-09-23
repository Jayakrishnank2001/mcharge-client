import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token=this._authService.getToken('token')
      if (token!==null) {
        this._router.navigate(['/dashboard']);
        return false;
      }
    return true
  }

}