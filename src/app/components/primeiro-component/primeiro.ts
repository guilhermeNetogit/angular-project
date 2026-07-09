import { Component, inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { InputProperty } from "../input-property/input-property";
import { AuthService } from "../login/service/auth.service";
import { OutputProperty } from "../output-property/output-property";

@Component({
  selector: 'app-primeiro',
  templateUrl: './primeiro.html',
  imports: [MatButtonModule, InputProperty, OutputProperty]
})

export class PrimeiroComponent {

  private authService = inject(AuthService);

  botaoClicado () {
    alert(`O número atual é: ${this.valorContador}...`);
  }

  onMudouValor(evento: any) {
    console.log(evento.novoValor);
    this.valorContador = evento.novoValor;
  }

  nomeUsuario = this.authService.usuarioAtual;

  valorContador: number = 5;
}
