import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-primeiro',
  templateUrl: './primeiro.html',
  imports: [MatButtonModule]
})

export class PrimeiroComponent {
  botaoClicado () {
    alert(`Botão Clicado!!`);
  }
}
