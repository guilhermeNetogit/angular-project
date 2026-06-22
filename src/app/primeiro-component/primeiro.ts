import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { InputProperty } from "../input-property/input-property";
import { OutputProperty } from "../output-property/output-property";

@Component({
  selector: 'app-primeiro',
  templateUrl: './primeiro.html',
  imports: [MatButtonModule, InputProperty, OutputProperty]
})

export class PrimeiroComponent {
  botaoClicado () {
    alert(`Botão Clicado!!`);
  }

  onMudouValor(evento: any) {
    console.log(evento.novoValor);
  }

  nomeUsuario: string =  'usuario.sa';
}
