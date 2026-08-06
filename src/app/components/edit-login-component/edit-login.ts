import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

import { AuthService } from '../../components/login/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './edit-login.html',
  styleUrl: './edit-login.scss',
})
export class EditLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  ocultarSenhaAtual = true;
  ocultarNovaSenha = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.carregarUsuario();
  }

  private initForm(): void {
    this.loginForm = this.fb.group(
      {
        login: ['', [Validators.required, Validators.minLength(3)]],
        senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
        novaSenha: ['', [Validators.minLength(6)]],
        confirmarNovaSenha: [''],
      },
      { validators: this.senhasIgualValidator }
    );
  }

  private carregarUsuario(): void {
    const usuarioLogadoNome = this.authService.usuarioAtual();
    if (usuarioLogadoNome) {
      this.loginForm.patchValue({ login: usuarioLogadoNome });
    }
  }

  private senhasIgualValidator(control: AbstractControl): ValidationErrors | null {
    const novaSenha = control.get('novaSenha')?.value;
    const confirmarNovaSenha = control.get('confirmarNovaSenha')?.value;

    if (novaSenha && novaSenha !== confirmarNovaSenha) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  async salvarAlteracoes(): Promise<void> {
  if (this.loginForm.invalid) {
    this.snackBar.open('Verifique os campos do formulário.', 'Fechar', { duration: 3000 });
    return;
  }

  const { login, senhaAtual, novaSenha } = this.loginForm.value;
  const loginDigitado = (login || '').trim();

  if (novaSenha) {
    this.isSubmitting = true;
    this.cdr.detectChanges();

    // Chama direto a API do Node
    this.authService.alterarSenhaServidor(loginDigitado, senhaAtual, novaSenha.trim()).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.snackBar.open('Senha alterada com sucesso!', 'OK', { duration: 3000 });

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        const mensagem = err.error?.erro || 'Erro ao atualizar a senha no servidor.';
        this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
      },
    });
  }
}
}
