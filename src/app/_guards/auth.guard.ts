import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {}
  canActivate(): boolean {
    if(!this.authService.isAuth()) {
      console.log("Token expirado o no válido")
      return false;
    } else {
      return true;
    }
  }
  
}
