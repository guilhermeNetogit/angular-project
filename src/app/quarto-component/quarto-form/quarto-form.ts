import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Quarto, QuartoService } from '../services/quarto.service';

@Component({
  selector: 'app-quarto-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './quarto-form.html',
  styleUrl: './quarto-form.scss',
})
export class QuartoForm {
  @Input() id?: string;

  testeSelecionado?: Quarto;

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
        // Busca o quarto correspondente
        this.testeSelecionado = this.quartoService.getAll().find((quarto) => quarto.id === idNumero);

        if (this.testeSelecionado === undefined) {
          this.testeSelecionado = undefined;
        }
      }
    });
  }
}
