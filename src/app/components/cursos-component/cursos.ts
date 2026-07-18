import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, delay, Observable, of, switchMap, tap } from 'rxjs';

// Importação do novo Modal compartilhado
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal';
import { Cursos2Service } from './cursos2.service';

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
  imports: [
    AsyncPipe,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class CursosComponent implements OnInit {
  columnsToDisplay = ['position', 'symbol', 'name', 'weight'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;

  selectedRow = signal<any | null>(null);

  initialData$!: Observable<PeriodicElement[] | null>;
  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  private reloadSubject = new BehaviorSubject<void>(undefined);

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  constructor(
    private service: Cursos2Service,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initialData$ = this.reloadSubject.pipe(
      tap(() => this.errorSubject.next(false)),
      switchMap(() =>
        this.service.getList().pipe(
          delay(1500),
          catchError((error) => {
            console.error(error);
            this.errorSubject.next(true);
            return of(null);
          }),
        ),
      ),
    );
  }

  recarregarDados() {
    this.reloadSubject.next();
  }

  selectRow(element: any): void {
    if (this.selectedRow() === element) {
      this.selectedRow.set(null);
    } else {
      this.selectedRow.set(element);
    }
  }

  isExpanded(element: PeriodicElement): boolean {
    return this.expandedElement === element;
  }

  toggle(element: PeriodicElement) {
    if (this.isExpanded(element)) {
      this.expandedElement = null;
      this.selectedRow.set(null);
    } else {
      this.expandedElement = element;
      this.selectedRow.set(element);
    }
  }

  onEdit(): void {
    const row = this.selectedRow();
    if (row) {
      const id = row.id || row.position;
      this.router.navigate(['cursos', 'editar', id]);
    }
  }

  // Método atualizado utilizando o ConfirmDialogComponent compartilhado
  onDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const registro = this.selectedRow();

    if (!registro) return;

    const nomeExibicao = registro.name || `ID ${registro.id || registro.position}`;

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Excluir Elemento',
        message: `Tem certeza que deseja excluir o elemento "${nomeExibicao}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.executarExclusao(registro);
      }
    });
  }

  executarExclusao(registro: any) {
    const idParaDeletar = registro.id || registro.position;
    const nomeExibicao = registro.name || `ID ${idParaDeletar}`;

    console.log('ID do Registro deletado:', idParaDeletar);

    this.service
      .delete(idParaDeletar)
      .pipe(
        tap(() => {
          this.recarregarDados();
          this.selectedRow.set(null);
          this.expandedElement = null;

          this.snackBar.open(`Curso "${nomeExibicao}" excluído com sucesso!`, 'Fechar', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        }),
        catchError((error) => {
          console.error('Erro ao excluir:', error);

          this.snackBar.open(`Erro ao tentar excluir o curso "${nomeExibicao}".`, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });

          return of(null);
        }),
      )
      .subscribe();
  }
}
