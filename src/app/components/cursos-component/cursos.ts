import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, catchError, delay, Observable, of, switchMap, tap } from 'rxjs';
import { CursosService } from './cursos.service';
import { Router, RouterLink } from '@angular/router';

export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class CursosComponent implements OnInit{

  columnsToDisplay = ['position', 'symbol', 'name', 'weight'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;

  selectedRow: any | null = null;

  initialData$!: Observable<PeriodicElement[] | null>;
  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  private reloadSubject = new BehaviorSubject<void>(undefined);

  /*
  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }*/

  constructor(
    private service: CursosService,
    private router: Router
  ) {}

  // Função para lidar com a seleção ao clicar em uma linha
    selectRow(element: any): void {
      // Se o usuário clicar no mesmo elemento, desmarca. Caso contrário, seleciona o novo.
      this.selectedRow = this.selectedRow === element ? null : element;
    }

  // Função disparada pelo botão Edit
    onEdit(): void {
      if (this.selectedRow) {
        // Navega para a rota de edição passando o identificador (ex: 'id' ou 'position')
        // Ajuste o caminho '/cursos/editar' e a propriedade identificadora conforme sua rota
        const id = this.selectedRow.id || this.selectedRow.position;
        this.router.navigate(['cursos', 'editar', id]);
      }
    }

  ngOnInit() {
    // O switchMap escuta o reloadSubject. Sempre que ele emite, uma nova busca é feita
    this.initialData$ = this.reloadSubject.pipe(
      tap(() => this.errorSubject.next(false)), // Reseta o estado de erro antes de tentar recarregar
      switchMap(() => this.service.getList().pipe(
        delay(1500),
        catchError(error => {
          console.error(error);
          this.errorSubject.next(true); // Ativa o erro no HTML
          return of(null); // Retorna null para entrar no bloco @else do HTML
        })
      ))
    );
  }

  recarregarDados() {
      this.reloadSubject.next(); // Dispara o gatilho para refazer a requisição
    }

  isExpanded(element: PeriodicElement): boolean {
    return this.expandedElement === element;
  }

  toggle(element: PeriodicElement) {
    if (this.isExpanded(element)) {
      this.expandedElement = null;
      this.selectedRow = null;
    } else {
      this.expandedElement = element;
      this.selectedRow = element;
    }

  }
}
