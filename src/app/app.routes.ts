import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { Pipes } from './pipes/pipes';
import { PrimeiroComponent } from './primeiro-component/primeiro';
import { SegundoComponent } from './segundo-component/segundo';
import { TerceiroComponent } from './terceiro-component/terceiro';
//import { Usuarios } from './usuarios/usuarios';
//import { UsuariosDetalhe } from './usuarios/usuarios-detalhe/usuarios-detalhe';

export const appRoutes: Routes = [
  { path: '', component: Home, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { skipMenu: true } },
  { path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.routing').then(m => m.usuariosRoutes),
    data: { title: 'Users Module' },
    canActivate: [AuthGuard],
    canActivateChild: [UsuariosGuard] },
  { path: 'pipes', component: Pipes, data: { title: 'Pipes Module' },
    canActivate: [AuthGuard] },
  { path: 'primeiro', component: PrimeiroComponent, data: { title: 'First Module' },
    canActivate: [AuthGuard] },
  { path: 'segundo', component: SegundoComponent, data: { title: 'Second Module' },
    canActivate: [AuthGuard] },
  { path: 'terceiro', component: TerceiroComponent, data: { title: 'Third Module' },
    canActivate: [AuthGuard] },
  { path: 'quarto',
    loadChildren: () => import('./quarto-component/quarto.routing').then(m => m.quartoRoutes),
    data: {title: 'Fourth Module'},
    canActivate: [AuthGuard] },
  //{ path: 'curso/:id', component: UsuariosDetalhe }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
