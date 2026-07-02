import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Usuarios } from './usuarios';
import { UsuariosDetalhe } from './usuarios-detalhe/usuarios-detalhe';
import { UsuariosRoutingModule } from './usuarios.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, Usuarios, UsuariosDetalhe, UsuariosRoutingModule],
})
export class UsuariosModule {}
