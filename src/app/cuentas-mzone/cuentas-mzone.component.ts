import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component'

import { SesionService } from '../services/sesion.service';
import { CuentaMzone } from '../model/CuentaMzone';
import { MatTableDataSource } from '@angular/material/table';
import { Proceso } from '../model/Proceso';

@Component({
  selector: 'app-cuentas-mzone',
  templateUrl: './cuentas-mzone.component.html',
  styleUrls: ['./cuentas-mzone.component.css']
})
export class CuentasMzoneComponent implements OnInit {

  mensaje = '';
  mensajeIdentificador = '';
  mensajeUsuario = '';

  cuentaMzone = new CuentaMzone();

  listaProcesos: Proceso[] = [];

  displayedColumns: string[] = ['id', 'proceso', 'mensaje', 'status'];
  dataSource = new MatTableDataSource<Proceso>();

  constructor(
    private sesionService: SesionService,
    private router: Router,
    private appComponent: AppComponent,
    private cdRef:ChangeDetectorRef
    ) { 
      this.dataSource.data = [];
    }

  ngOnInit(): void {
    this.validarSesion();

    this.iniciarTablatest();
  }

  registrar(){

  }
  cancelar(){
    this.mensaje = '';
    this.mensajeIdentificador = '';
    this.mensajeUsuario = '';
    this.cuentaMzone = new CuentaMzone();
    this.listaProcesos = [];
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

  iniciarTablatest(){
    let proceso = new Proceso();
    proceso.id = 1;
    proceso.proceso = 'Registro de cuenta';
    proceso.mensaje = 'Registro realizado con exito'
    proceso.status = true;

    let proceso2 = new Proceso();
    proceso2.id = 2;
    proceso2.proceso = 'Login con cuenta nueva';
    proceso2.mensaje = 'Registro realizado con exito'
    proceso2.status = true;

    let proceso3 = new Proceso();
    proceso3.id = 3;
    proceso3.proceso = 'Registro de cuenta';
    proceso3.mensaje = 'Registro realizado con exito'
    proceso3.status = false;

    let proceso4 = new Proceso();
    proceso4.id = 4;
    proceso4.proceso = 'Registro de cuenta';
    proceso4.mensaje = 'Registro realizado con exito'
    proceso4.status = true;

    let proceso5 = new Proceso();
    proceso5.id = 5;
    proceso5.proceso = 'Registro de cuenta';
    proceso5.mensaje = 'Registro realizado con exito'
    proceso5.status = false;

    this.listaProcesos[0] = proceso;
    this.listaProcesos[1] = proceso2;
    this.listaProcesos[2] = proceso3;
    this.listaProcesos[3] = proceso4;
    this.listaProcesos[4] = proceso5;
    this.dataSource = new MatTableDataSource<Proceso>(this.listaProcesos);
  }
  ocultarMensaje(){
    this.mensaje = '';
  }

}
