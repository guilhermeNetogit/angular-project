import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contador',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './output-property.html',
  styleUrl: './output-property.scss',
})
export class OutputProperty {
  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  @ViewChild('campoInput') campoValorInput!: ElementRef;

  incrementa() {
    this.valor++;
    this.campoValorInput.nativeElement.value = this.valor;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa() {
    this.valor--;
    this.campoValorInput.nativeElement.value = this.valor;;
    this.mudouValor.emit({novoValor: this.valor});
  }
}
