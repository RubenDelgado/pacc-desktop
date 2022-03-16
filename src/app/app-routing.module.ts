import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { PrincipalComponent } from "./principal/principal.component";
import { CuentasMzoneComponent } from './cuentas-mzone/cuentas-mzone.component';

const routes: Routes = [  
  { path: "", component: LoginComponent},
  { path: "login", component: LoginComponent},
  { path: "inicio", component: PrincipalComponent},
  { path: "cuentas-mzone", component: CuentasMzoneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
