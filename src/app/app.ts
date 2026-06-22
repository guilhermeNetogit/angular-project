import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeiroComponent } from "./primeiro-component/primeiro";
import { SegundoComponent } from "./segundo-component/segundo";
import { Usuarios } from "./usuarios/usuarios";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeiroComponent, SegundoComponent, Usuarios],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-project');

  // Armazena a aba/componente que está visível atualmente
  protected readonly componenteAtivo = signal<string>('usuarios');
}
