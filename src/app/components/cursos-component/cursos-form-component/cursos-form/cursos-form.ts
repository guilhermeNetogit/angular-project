import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { CursosService } from '../../cursos.service';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInput, ReactiveFormsModule, MatIconModule],
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss'
})
export class CursosFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CursosService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      position: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      symbol: ['', [Validators.required, Validators.maxLength(2)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required,Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
  if (this.form.valid) {
    console.log('Enviando dados:', this.form.value);

    // Envia o formulário completo diretamente ao seu service
    this.service.save(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/cursos']);
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
      }
    });
  }
}

  onCancel(): void {
      this.router.navigate(['/cursos']);
    }

}
