import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Pipes } from './pipes/pipes';
import { PrimeiroComponent } from './primeiro-component/primeiro';
import { SegundoComponent } from './segundo-component/segundo';
import { TerceiroComponent } from './terceiro-component/terceiro';
//import { Usuarios } from './usuarios/usuarios';
//import { UsuariosDetalhe } from './usuarios/usuarios-detalhe/usuarios-detalhe';

export const appRoutes: Routes = [
  { path: '', component: Home, data: { title: 'Home' }},
  { path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.routing').then(m => m.usuariosRoutes),
    data: { title: 'Users Module' } },
  { path: 'pipes', component: Pipes, data: { title: 'Pipes Module' }},
  { path: 'primeiro', component: PrimeiroComponent, data: { title: 'First Module' }},
  { path: 'segundo', component: SegundoComponent, data: { title: 'Second Module' }},
  { path: 'terceiro', component: TerceiroComponent, data: { title: 'Third Module' }},
  //{ path: 'curso/:id', component: UsuariosDetalhe }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
