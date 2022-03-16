import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
//import { ElectronService } from 'ngx-electron';

import { Usuario } from '../model/Usuario';

import { SesionService } from '../services/sesion.service';
import { RespuestaToken } from '../model/RespuestaToken';

import { AppComponent } from '../app.component'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logger: any;
  user = new Usuario();
  mensajeUsuario: string | null = '';
  mensajePassword: string | null = '';
  mensajeError: string | null = ''; 

  show: boolean = false;

  respuestaToken = new RespuestaToken();

  constructor(
    private sesionService: SesionService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private appComponent: AppComponent,
    private cdRef:ChangeDetectorRef,
    //private electronService: ElectronService
  ) { 



    console.log('[LoginComponent] constructor called');
  }

  ngOnInit(): void {
    this.validarSesion();
  }

  login() {
    this.spinnerService.show();
    console.log(this.user.usuario);
    console.log(this.user.password);

    this.mensajeUsuario = '';
    this.mensajePassword = '';
    this.mensajeError = '';

    if(this.user.usuario == null || this.user.usuario == undefined || this.user.usuario.trim() == ''){
      this.mensajeUsuario = "El usuario es requerido";    
      this.user.usuario = '';  
      this.spinnerService.hide();
      return;
    }

    if(this.user.password == null || this.user.password == undefined || this.user.password.trim() == ''){
      this.mensajePassword = "El password es requerido";    
      this.user.password = '';  
      this.spinnerService.hide();
      return;
    }

    //Logeo del usuario que tiene privilegios para usar el desarrollo
    this.sesionService.getIniciarSesion(this.user).subscribe((data: RespuestaToken) => {
      
      this.respuestaToken = data;
      if(!this.respuestaToken.error){
        console.log("TOKEN OBTENIDO CON EXITO");
        console.log(JSON.stringify(this.respuestaToken));


        //Aqui tengo que validar la lista de usuarios y obtener el permiso PACC
        //Consulta detalles del usuario para verificar si tiene privilegio PACC para usar el desarrollo de creación de cuentas.
        this.sesionService.getValidarPrivilegioPACC(this.respuestaToken.access_token).subscribe((data: any) => {
          
          let respuestaPermiso = data;
          
          console.log("RESPUESTA AL OBTENER EL PERMISO PACC: "+JSON.stringify(respuestaPermiso));

          let valueObj: any;

          respuestaPermiso.value.forEach((value:any) => {
            if(value.username == this.user.usuario){
              console.log(value.username +'='+this.user.usuario);
              valueObj = value;
              return;
            }
          });

          if(valueObj != undefined && valueObj != null && valueObj != ""){
            console.log("HEMOS ENCONTRADO EL DETALLE DEL USUARIO "+this.user.usuario+" : "+JSON.stringify(valueObj));

            if(valueObj.hasOwnProperty('phoneOffice')){
              if(valueObj.phoneOffice == 'PACC'){
                this.sesionService.setToken(this.respuestaToken.access_token);
                this.sesionService.setUsuarioSesion(this.respuestaToken.nombre);
                this.sesionService.setPasswordSesion(this.user.password);
                this.router.navigate(['/inicio/']);
              }else{
                console.log("EL USUARIO "+this.user.usuario+" NO CUENTA CON EL PERMISO NECESARIO PACC")
                this.mensajeError = "El usuario "+this.user.usuario+" no cuenta con el permiso PACC";
                this.spinnerService.hide();
              }

            }else{
              console.log("NO EXISTE LA PROPIEDAD phoneOffice Y NO SE PUEDE VALIDAR EL PERMISO PACC")
              this.mensajeError = "No existe la propiedad phoneOffice  y no se puede validar el permiso PACC";
              this.spinnerService.hide();
            }

           

            
          }else{
            console.log("NO SE HA ENCONTRADO EL DETALLE DEL USUARIO "+this.user.usuario+" Y NO SE PUEDE VALIDAR EL PERMISO PACC")
            this.mensajeError = "No se ha encontrado el detalle del usuario "+this.user.usuario+"  y no se puede validar el permiso PACC";
            this.spinnerService.hide();
          }
          
        },
        (err) => {
          console.log("ERROR AL OBTENER EL PERMISO PACC: "+err)
          this.mensajeError = err;
          this.spinnerService.hide();
        });
        
      }else{
        console.log("ERROR AL OBTENER EL TOKEN");
        console.log(JSON.stringify(this.respuestaToken));

        this.mensajeError = "Error Code: "+ this.respuestaToken.error +"\nMessage: "+ this.respuestaToken.error_description;
      }
      
      this.spinnerService.hide();
    },
    (err) => {
      console.log("ERROR AL OBTENER EL TOKEN: "+err)
      this.mensajeError = err;
      this.spinnerService.hide();
    });
  }

  cancelar(){
    this.user = new Usuario();
    this.mensajeUsuario = '';
    this.mensajePassword = '';
    this.mensajeError = '';
    this.show = false;
  }

  showPassword() {
    this.show = !this.show;
  }

  validarSesion(){
    const tokenSesion = this.sesionService.getToken();

    console.log("LOGIN - TOKEN EN SESION: "+tokenSesion);

    if(tokenSesion == null || tokenSesion == '' || tokenSesion == undefined){
      this.appComponent.mostrarMenu = false;
      this.appComponent.isExpanded = false;
    }else{
      this.appComponent.mostrarMenu = false;
      this.appComponent.isExpanded = false;

      this.router.navigate(['/inicio/']);
    }
  }

  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
}
