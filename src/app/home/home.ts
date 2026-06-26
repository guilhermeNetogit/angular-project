import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  nomeUsu: string;

  protected readonly title = signal('angular-project');

  constructor () {
    this.nomeUsu = 'guilherme.neto';
  }
}
