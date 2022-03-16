import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component'

import { SesionService } from '../services/sesion.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(
    private sesionService: SesionService,
    private router: Router,
    private appComponent: AppComponent,
    private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion(){
    const tokenSesion = this.sesionService.getToken();
    const usuarioSesion = this.sesionService.getUsuarioSesion();
    const passwordSesion = this.sesionService.getPasswordSesion();

    console.log("PRINCIPAL - TOKEN EN SESION: "+tokenSesion);
    console.log("PRINCIPAL - USUARIO EN SESION: "+usuarioSesion);
    console.log("PRINCIPAL - PASSWORD EN SESION: "+passwordSesion);

    if(tokenSesion == null || tokenSesion == "" || tokenSesion == undefined){
      this.appComponent.mostrarMenu = false;
      this.appComponent.isExpanded = false;
      this.router.navigate(['/login/']);      
    }else{
      this.appComponent.mostrarMenu = true;
      this.appComponent.isExpanded = false;
    }
  }

  cerrarSesion(){
    const tokenSesion = this.sesionService.deleteToken();
    const usuarioSesion = this.sesionService.deleteUsuarioSesion();

    console.log("TOKEN EN SESION: "+tokenSesion);
    console.log("USUARIO EN SESION: "+usuarioSesion);

    this.appComponent.mostrarMenu = false;
    this.appComponent.isExpanded = false;
    this.router.navigate(['/login/']);
  }
}
