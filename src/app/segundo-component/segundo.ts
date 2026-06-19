import { Component } from '@angular/core';

@Component({
  selector: 'app-segundo',
  imports: [],
  templateUrl: './segundo.html',
  styleUrl: './segundo.scss',
})
export class SegundoComponent {

  cursoAngular: true = true;
  getValor() {
  return (2**3);
  }
  getCurtir() {
    return true;
  }
  urlImg = 'https://picsum.photos/id/237/200/300';
  urlImg2 = 'https://picsum.photos/id/15/200/300';
  urlImg3 = 'https://picsum.photos/id/17/200/300';
}
