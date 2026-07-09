import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './input-property.html',
  styleUrl: './input-property.scss',
})
export class InputProperty {
 @Input('nome') nomeUsuario: string = '';
}
