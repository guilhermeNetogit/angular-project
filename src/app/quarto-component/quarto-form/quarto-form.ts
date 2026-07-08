import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Quarto, QuartoService } from '../services/quarto.service';
import { FormDeactivate } from '../../guards/form-deactivate.guard';

@Component({
  selector: 'app-quarto-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './quarto-form.html',
  styleUrl: './quarto-form.scss',
})
export class QuartoForm implements FormDeactivate {
  @Input() id?: string;

  testeSelecionado?: Quarto;

  private formMudou: boolean = false;

  constructor(
    private quartoService: QuartoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Escuta dinamicamente a mudança da URL a cada clique na lista
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? undefined;

      if (this.id) {
  const idNumero = Number(this.id);
  const quartoOriginal = this.quartoService.getAll().find((quarto) => quarto.id === idNumero);

  if (quartoOriginal) {
    this.testeSelecionado = structuredClone(quartoOriginal);
  } else {
    this.testeSelecionado = undefined;
  }
}
    });
  }

  onInput() {
    this.formMudou = true;
    console.log('mudou');
  }

  podeMudarRota(): boolean {
  if (this.formMudou && this.testeSelecionado) {
    const desejaSalvar = confirm(
      'Você fez alterações! Deseja SALVAR antes de sair?\n\n' +
      '[OK] = Salvar e Sair\n' +
      '[Cancelar] = Descartar e Sair'
    );

    if (desejaSalvar) {
      // Salva no serviço as alterações feitas no clone
      this.quartoService.update(this.testeSelecionado);
      alert('Alterações salvas com sucesso!');
    } else {
      alert('Alterações descartadas.');
    }

    this.formMudou = false; // Reseta o estado do formulário
    return true; // Permite sair da página
  }

  return true; // Se o formulário não mudou, sai direto sem perguntar
}
podeDesativar() {
  return this.podeMudarRota();
}
}
