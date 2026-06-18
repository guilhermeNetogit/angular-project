import { Component } from '@angular/core';
import { UsuariosDetalhe } from "./usuarios-detalhe/usuarios-detalhe";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuariosDetalhe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {}
