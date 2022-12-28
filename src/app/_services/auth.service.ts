import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private URL = 'https://sytwbackend-production.up.railway.app/usuario';
  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper:JwtHelperService ){}

  login(nombre: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.URL}/login`,{nombre,contraseña})
  }
  register(nombre: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.URL}/register`,{nombre,contraseña,});
  }
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    } else {
      return true;
    }
  }
}
