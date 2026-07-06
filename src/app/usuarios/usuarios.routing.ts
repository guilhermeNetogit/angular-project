import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Usuarios } from './usuarios';
import { UsuariosDetalhe } from './usuarios-detalhe/usuarios-detalhe';

export const usuariosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./usuarios').then(m => m.Usuarios),
    data: { title: 'Users Module' }
  },
  {
    path: 'curso/:id',
    loadComponent: () => import('./usuarios-detalhe/usuarios-detalhe').then(m => m.UsuariosDetalhe)
  }
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule{}
