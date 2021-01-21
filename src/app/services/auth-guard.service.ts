import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Router, Route, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../services/auth.service';
import { JwtStorageService } from '../services/jwt-storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private jwtStorage: JwtStorageService) {}

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
   const token: string = this.jwtStorage.getToken();
   console.dir(token);
   if (token) {
       if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
       }
   }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
