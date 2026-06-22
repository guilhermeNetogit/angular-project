import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-terceiro',
  imports: [FormsModule],
  templateUrl: './terceiro.html',
  styleUrl: './terceiro.scss',
})
export class TerceiroComponent {
  nome: string = 'digite-nome';
  pessoa: any = {
    nome: 'nome-aqui',
    idade: 0
  }
}
