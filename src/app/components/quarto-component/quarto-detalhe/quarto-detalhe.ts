import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../login/service/auth.service';
import { Quarto, QuartoService } from '../services/quarto.service';

@Component({
  selector: 'app-quarto-detalhe',
  imports: [MatIconModule, RouterLink],
  templateUrl: './quarto-detalhe.html',
  styleUrl: './quarto-detalhe.scss',
})
export class QuartoDetalhe {
  @Input() id?: string;

  testeSelecionado?: Quarto;

  constructor(
    private quartoService: QuartoService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) {}

  voltar(): void {
    if (!this.testeSelecionado) {
      this.router.navigate(['/quarto'], { queryParams: { pagina: 1 } });
    } else {
      this.location.back();
    }
  }

  ngOnInit() {
    // Escuta dinamicamente a mudança da URL a cada clique na lista
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? undefined;

      if (this.id) {
        const idNumero = Number(this.id);
        // Busca o quarto correspondente
        this.testeSelecionado = this.quartoService
          .getAll()
          .find((quarto) => quarto.id === idNumero);
      }
    });
  }
}
