import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found';
import { Pipes } from './pipes/pipes';
import { PrimeiroComponent } from './primeiro-component/primeiro';
import { SegundoComponent } from './segundo-component/segundo';
import { TerceiroComponent } from './terceiro-component/terceiro';
//import { Usuarios } from './usuarios/usuarios';
//import { UsuariosDetalhe } from './usuarios/usuarios-detalhe/usuarios-detalhe';

export const appRoutes: Routes = [
  { path: 'home', component: Home, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { skipMenu: true } },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.routing').then((m) => m.usuariosRoutes),
    data: { title: 'Users Module' },
    canMatch: [authGuard],
    canActivateChild: [UsuariosGuard],
  },
  { path: 'pipes', component: Pipes, data: { title: 'Pipes Module' }, canMatch: [authGuard] },
  {
    path: 'primeiro',
    component: PrimeiroComponent,
    data: { title: 'First Module' },
    canMatch: [authGuard],
  },
  {
    path: 'segundo',
    component: SegundoComponent,
    data: { title: 'Second Module' },
    canMatch: [authGuard],
  },
  {
    path: 'terceiro',
    component: TerceiroComponent,
    data: { title: 'Third Module' },
    canMatch: [authGuard],
  },
  {
    path: 'quarto',
    loadChildren: () => import('./quarto-component/quarto.routing').then((m) => m.quartoRoutes),
    data: { title: 'Fourth Module' },
    canMatch: [authGuard],
    canActivateChild: [UsuariosGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
