import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
})
export class Pipes {
  usuarios = [
    {codUsu: 21, nomeUsu: 'user2.test', senha: 'stronger@password#', salario: 1620, dtInc: new Date(2026,5,25)},
    { codUsu: 314, nomeUsu: 'user.test', senha: 'strong@password#', salario: 1620, dtInc: new Date(2026,5,24)},
    { codUsu: 0, nomeUsu: 'sup', senha: 'strong@password#', salario:3240, dtInc: new Date(2026,5,24)
    }
  ];
}
