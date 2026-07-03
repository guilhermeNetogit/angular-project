import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Usuarios } from './usuarios';
import { UsuariosDetalhe } from './usuarios-detalhe/usuarios-detalhe';

export const usuariosRoutes: Routes = [
  { path: '', component: Usuarios, data: { title: 'Users Module' } },
  { path: 'curso/:id', component: UsuariosDetalhe }
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule{}
