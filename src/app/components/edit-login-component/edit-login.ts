import { Component, OnInit } from '@angular/core';
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
    private snackBar: MatSnackBar,
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
    const usuarioLogadoAtual = (this.authService.usuarioAtual() || loginDigitado).trim();

    // 1. Valida se a senha atual digitada é válida no servidor
    const senhaAtualValida = await this.authService.validaLogin(usuarioLogadoAtual, senhaAtual);

    if (!senhaAtualValida) {
      this.snackBar.open('Senha atual incorreta.', 'Fechar', { duration: 3000 });
      return;
    }

    // 2. Se informou nova senha, envia requisição ao servidor
    if (novaSenha) {
      this.isSubmitting = true;

      this.authService.alterarSenhaServidor(loginDigitado, novaSenha.trim()).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Senha alterada no servidor com sucesso!', 'OK', { duration: 3000 });
          this.loginForm.patchValue({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
        },
        error: () => {
          this.isSubmitting = false;
          this.snackBar.open('Erro ao atualizar a senha no servidor.', 'Fechar', { duration: 3000 });
        },
      });
    }
  }
}
