import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, delay, Observable, of, switchMap, tap } from 'rxjs';
import { CursosService } from './cursos.service';

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
    private service: CursosService,
    private router: Router,
  ) {}

  ngOnInit() {
    // O switchMap escuta o reloadSubject. Sempre que ele emite, uma nova busca é feita
    this.initialData$ = this.reloadSubject.pipe(
      tap(() => this.errorSubject.next(false)), // Reseta o estado de erro antes de tentar recarregar
      switchMap(() =>
        this.service.getList().pipe(
          delay(1500),
          catchError((error) => {
            console.error(error);
            this.errorSubject.next(true); // Ativa o erro no HTML
            return of(null); // Retorna null para entrar no bloco @else do HTML
          }),
        ),
      ),
    );
  }

  recarregarDados() {
    this.reloadSubject.next(); // Dispara o gatilho para refazer a requisição
  }

  // Função para lidar com a seleção ao clicar em uma linha
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

  // Função disparada pelo botão Edit
  onEdit(): void {
    const row = this.selectedRow();
    if (row) {
      // Navega para a rota de edição passando o identificador (ex: 'id' ou 'position')
      // Ajuste o caminho '/cursos/editar' e a propriedade identificadora conforme sua rota
      const id = row.id || row.position;
      this.router.navigate(['cursos', 'editar', id]);
    }
  }

  onDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const registro = this.selectedRow();

    if (!registro) return;

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: registro,
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        // Se o usuário clicou em "Deletar", aciona a sua lógica de exclusão
        this.executarExclusao(registro);
      }
    });
  }

  executarExclusao(registro: any) {
    // Como 'registro' agora é o objeto completo, conseguimos ler o ID e o Nome corretos!
    const idParaDeletar = registro.id || registro.position;

    console.log('ID do Registro deletado:', idParaDeletar);

    // Altere para a propriedade real do seu objeto (ex: registro.name, registro.titulo, etc.)
    const nomeExibicao = registro.name || `ID ${idParaDeletar}`;

    this.service
      .delete(idParaDeletar)
      .pipe(
        tap(() => {
          // Executa o recarregamento dos dados
          this.recarregarDados();

          this.selectedRow.set(null);
          this.expandedElement = null;

          // Exibe a barra de notificação com o nome correto
          this.snackBar.open(`Curso "${nomeExibicao}" excluído com sucesso!`, 'Fechar', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        }),
        catchError((error) => {
          console.error('Erro ao excluir:', error);

          // Exibe feedback de erro para o usuário
          this.snackBar.open(`Erro ao tentar excluir o curso "${nomeExibicao}".`, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });

          return of(null);
        }),
      )
      .subscribe(); // O subscribe ativa a execução da stream HTTP
  }
}

//Componente do Modal
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-remove.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
