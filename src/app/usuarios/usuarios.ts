import { Component } from '@angular/core';
import { UsuariosDetalhe } from "./usuarios-detalhe/usuarios-detalhe";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuariosDetalhe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  nomeUsu: string;
  habilitacoes: string[] = ['JAVA', 'SQL', 'JAVASCRIPT', 'ANGULAR', 'SPRING'];

  constructor () {
    this.nomeUsu = 'guilherme.neto';
  }
}
