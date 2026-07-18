import { CursosRoutingModule } from './components/cursos-component/cursos.routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/cursos-component/cursos';
import { FormComponent } from './components/form-component/form';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found';
import { Pipes } from './components/pipes/pipes';
import { PrimeiroComponent } from './components/primeiro-component/primeiro';
import { SegundoComponent } from './components/segundo-component/segundo';
import { authGuard } from './guards/auth.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { UploadFileComponent } from './components/upload-file/upload-file';
//import { Usuarios } from './usuarios/usuarios';
//import { UsuariosDetalhe } from './usuarios/usuarios-detalhe/usuarios-detalhe';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { skipMenu: true } },
  {
    path: 'usuarios',
    loadChildren: () => import('./components/usuarios/usuarios.routing').then((m) => m.usuariosRoutes),
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
    path: 'quarto',
    loadChildren: () => import('./components/quarto-component/quarto.routing').then((m) => m.quartoRoutes),
    data: { title: 'Fourth Module' },
    canMatch: [authGuard],
    canActivateChild: [UsuariosGuard],
  },
  {
    path: 'form',
    component: FormComponent,
    data: { title: 'Form Module' },
    canMatch: [authGuard],
  },
  {
    path: 'cursos',
    data: { title: 'Cursos Module' },
    loadChildren: () => import('./components/cursos-component/cursos.routes').then((m) => m.CursosRoutingModule),
    canMatch: [authGuard],
  },
  {
    path: 'upload-file',
    component: UploadFileComponent,
    data: { title: 'Upload Files' },
    canMatch: [authGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
