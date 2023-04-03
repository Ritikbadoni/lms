import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { error } from 'cypress/types/jquery';
import { isBoolean } from 'cypress/types/lodash';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  errorCodeMessages: { [key: string]: string } = {
    'auth/user-is-not-loggedIn' : 'Please LogIn First',
  }

  constructor(private authService : AuthService, private router :Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isUserLoggedIn){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
    
  }
}