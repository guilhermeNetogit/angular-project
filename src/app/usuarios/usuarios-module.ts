import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Usuarios } from './usuarios';
import { UsuariosDetalhe } from './usuarios-detalhe/usuarios-detalhe';

@NgModule({
  declarations: [],
  imports: [CommonModule, Usuarios, UsuariosDetalhe],
})
export class UsuariosModule {}
