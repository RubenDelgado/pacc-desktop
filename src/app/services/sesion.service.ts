import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

import { Usuario } from '../model/Usuario';
import { RespuestaToken } from '../model/RespuestaToken';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  endpoint = '';
  token = '';

  constructor(
    private http: HttpClient,
    private cookies: CookieService) { }

  usaurio: string = "";
  password: string = "";
  tokenSession: string = "";  

  public getIniciarSesion(user: Usuario) : Observable<RespuestaToken>{

    this.endpoint = 'https://login.mzoneweb.net/'
    this.usaurio = user.usuario!;
    this.password = user.password!;

    console.log('ENDPOINT: '+this.endpoint)
    console.log('USUARIO: '+this.usaurio)
    console.log('PASSWORD: '+this.password)

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    } 
    console.log('HEADERS: '+JSON.stringify(httpOptions));

    const body = new HttpParams()
        .set('grant_type', 'password')
        .set('client_id', 'mz-a3tek')
        .set('client_secret', 'WJ4wUJo79qFsMm4T9Rj7dKw4')
        .set('scope', 'openid mz6-api.all mz_username')
        .set('username', this.usaurio)
        .set('password', this.password);
    console.log('BODY: '+JSON.stringify(body));

    return this.http.post<RespuestaToken>(this.endpoint + 'connect/token', body, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }

  public getValidarPrivilegioPACC(tokenSesion: string) : Observable<any>{
    this.token = tokenSesion;

    let format ='json';
    let count = true; 
    let skip = 0;
    let select = 'id,username,phoneOffice,loginEnabled'
    this.endpoint = 'https://live.mzoneweb.net/mzone62.api/Users?$format='+format+'&$count='+count+'&$skip='+skip+'&$select='+select

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    } 
    console.log('HEADERS: '+JSON.stringify(httpOptions));

    return this.http.get<any>(this.endpoint, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }

    // Error handling 
  handleError(error: any) {
    console.log("ERROR DE PETICION: "+JSON.stringify(error));

    console.log('>>>>> ERROR: '+error.message);

    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      console.log('ENTRO CUANDO ES ERROR EVENT (Get client-side error)');
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      console.log('ENTRO CUANDO ES OTRO ERROR (Get server-side error)');
      // Get server-side error
      let mensaje = '';

      if(error.hasOwnProperty('error.error_description')){
        if(typeof(error.error.error_description) !== 'undefined' && error.error.error_description != undefined && error.error.error_description != null){
          console.log("MENSAJE DE ERROR 1 : "+error.error.error_description);
          mensaje = error.error.error_description
        }else{
          console.log('NO ES ERROR: error.error.error_description');
        }
      }
      

      if(error.hasOwnProperty('error.error.message')){
        if(typeof(error.error.error.message) !== 'undefined' && error.error.error.message != undefined && error.error.error.message != null){
          console.log("MENSAJE DE ERROR 2 : "+error.error.error.message);
          mensaje = error.error.error.message
        }else{
          console.log('NO ES ERROR: error.error.error.message');
        }
      }
      
      if(error.hasOwnProperty('message')){
        if(typeof(error.message) !== 'undefined' && error.message != undefined && error.message != null){
          console.log("MENSAJE DE ERROR 3 : "+error.message);
          mensaje = error.message;
        }else{
          console.log('NO ES ERROR: error.message');
        }
      }
             
      errorMessage = `Error Code: ${error.status}\nMessage: ${mensaje}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public setSession(sessionObj: string){
    localStorage.setItem('session', JSON.stringify(sessionObj));
  }

  public getSession(){
    return localStorage.getItem("session");
  }

  public deleteSession(){
    return localStorage.removeItem("session");
  }

  public setToken(token: string) {
    this.cookies.set("token", token);
    localStorage.setItem("token", token);
  }

  public setUsuarioSesion(usuario: string) {
    this.cookies.set("usuarioSesion", usuario);
    localStorage.setItem("usuarioSesion", usuario);
  }

  public setPasswordSesion(password: string) {
    this.cookies.set("passwordSesion", password);
    localStorage.setItem("passwordSesion", password);
  }

  public getToken() {
    //return this.cookies.get("token");
    return localStorage.getItem("token");
  }

  public getPasswordSesion() {
    //return this.cookies.get("passwordSesion");
    return localStorage.getItem("passwordSesion");
  }

  public getUsuarioSesion() {
    //return this.cookies.get("usuarioSesion");
    return localStorage.getItem("usuarioSesion");
  }

  public deleteToken() {
    //return this.cookies.delete("token");
    return localStorage.removeItem("token");
  }

  public deleteUsuarioSesion() {
    //return this.cookies.delete("usuarioSesion");
    return localStorage.removeItem("usuarioSesion");
  }

  public deletePasswordSesion() {
    //return this.cookies.get("usuarioSesion");
    return localStorage.removeItem("passwordSesion");
  }

}
