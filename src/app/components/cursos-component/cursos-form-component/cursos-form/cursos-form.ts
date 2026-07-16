import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../../shared/services/notifications.service';
import { CursosService } from '../../cursos.service';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss',
})
export class CursosFormComponent {
  form!: FormGroup;
  cursoId: any = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      position: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      symbol: ['', [Validators.required, Validators.maxLength(2)]],
      weight: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: any) => {
      const id = params['id'];
      console.log(id);

      if (id) {
        this.cursoId = id;

        this.service
          .getById(this.cursoId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (curso) => {
              this.form.patchValue(curso);
            },
            error: (err) => {
              console.error('Erro ao buscar curso:', err);
              this.notificationService.error('Erro ao carregar os dados do curso.');
              this.router.navigate(['/cursos']);
            },
          });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Enviando dados:', this.form.value);

      // 1. Define qual requisição fazer com base na existência do cursoId
      const request$ = this.cursoId
        ? this.service.update(this.cursoId, this.form.value)
        : this.service.create(this.form.value);

      request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          const mensagem = this.cursoId
            ? 'Registro atualizado com sucesso!'
            : 'Registro salvo com sucesso!';
          this.notificationService.success(mensagem);
          this.router.navigate(['/cursos']);
        },
        error: (err) => {
          console.error('Erro ao salvar:', err);
          this.notificationService.error('Ocorreu um erro ao tentar salvar o curso.');
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/cursos']);
  }
}
