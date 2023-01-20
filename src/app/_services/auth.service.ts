import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: new HttpParams()
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
  cal_dmg(pok1: any, pok2: any, move: any): Observable<any> {
    return this.http.post(`${this.URL}/damage`, {pok1, pok2, move });
  }
  save_team(id: string, equipo: string[]): Observable<any> {
    if (this.isAuth()) {
      let cookies = document.cookie.split(';');
      let token = cookies.find(cookie => cookie.startsWith(" token="));
      token = token.substring(7);
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
      httpOptions.params = httpOptions.params.set('id', id);
      return this.http.patch(`${this.URL}/usuario`,{equipo}, httpOptions);
    } else {
      return null;
    }
  }

  isAuth(): boolean {
    let cookies = document.cookie.split(';');
    let token = cookies.find(cookie => cookie.startsWith(" token="));
    if(token==undefined){
      return false;
    }else {
      token = token.substring(7);
    }
    if(token=="" || this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }
}
