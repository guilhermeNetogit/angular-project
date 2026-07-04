import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Quarto, QuartoService } from './services/quarto.service';
import { MatActionList, MatListItem } from "@angular/material/list";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quarto',
  imports: [RouterOutlet, RouterLink, MatActionList, MatListItem],
  templateUrl: './quarto.html',
  styleUrl: './quarto.scss',
})
export class QuartoComponent {

  quartos: Quarto[] = [];

  constructor(
    private quartoService: QuartoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quartos = this.quartoService.getAll();

  }

  action(descricao: string) {
    console.log('Teste clicado:', descricao);
  }
}
