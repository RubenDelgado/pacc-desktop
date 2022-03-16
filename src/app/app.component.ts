import { Component,ChangeDetectorRef  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SesionService } from './services/sesion.service';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'activaciones-web';
  public isExpanded = false;
  public mostrarMenu = false;
  anio: number = new Date().getFullYear();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(): void {
      this.mostrarMenu = false;
      this.validarSesion();
    }

  ngAfterViewChecked(){
    this.mostrarMenu = this.mostrarMenu;
    this.isExpanded = this.isExpanded;
    this.cdRef.detectChanges();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sesionService: SesionService,
    private router: Router,
    public dialogo: MatDialog,
    private cdRef:ChangeDetectorRef) {}

  validarSesion(){
    const tokenSesion = this.sesionService.getToken();

    console.log("TOKEN EN SESION: "+tokenSesion);

    if(tokenSesion == null || tokenSesion == "" || tokenSesion == undefined){
      this.mostrarMenu = false;
      this.isExpanded = false;
    }else{
      this.mostrarMenu = false;
      this.isExpanded = false;
    }
  }

  cerrarSesion(){

    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de cerrar la sesión?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          const tokenSesion = this.sesionService.deleteToken();
          const usuarioSesion = this.sesionService.deleteUsuarioSesion();
          const passwordSesion = this.sesionService.deletePasswordSesion();

          console.log("TOKEN EN SESION: "+tokenSesion);
          console.log("USUARIO EN SESION: "+usuarioSesion);
          console.log("PASSWORD EN SESION: "+passwordSesion);
      
          this.mostrarMenu = false;
          this.router.navigate(['/login/']);
        } 
      });

  }
}
