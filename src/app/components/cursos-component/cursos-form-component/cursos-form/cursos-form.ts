import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../shared/services/notifications.service';
import { CursosService } from '../../cursos.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss'
})
export class CursosFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      position: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      symbol: ['', [Validators.required, Validators.maxLength(2)]],
      weight: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required,Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
  if (this.form.valid) {
    console.log('Enviando dados:', this.form.value);

    // Envia o formulário completo diretamente ao seu service
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.notificationService.success('Registro salvo com sucesso!');
        this.router.navigate(['/cursos']);
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        this.notificationService.error('Ocorreu um erro ao tentar salvar o curso.');
      }
    });
  }
}

  onCancel(): void {
      this.router.navigate(['/cursos']);
    }

}
