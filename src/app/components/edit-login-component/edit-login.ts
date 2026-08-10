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
    public authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initForm();
    await this.carregarUsuario();
  }

  private initForm(): void {
    this.loginForm = this.fb.group(
      {
        nomeusu: ['', [Validators.required, Validators.minLength(4)]],
        login: ['', [Validators.required, Validators.minLength(3)]],
        senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
        novaSenha: ['', [Validators.minLength(6)]],
        confirmarNovaSenha: [''],
      },
      { validators: this.senhasIgualValidator },
    );
  }

  private async carregarUsuario(): Promise<void> {
    const usuarioLogadoNome = this.authService.usuarioAtual();

    if (usuarioLogadoNome) {
      const dados = await this.authService.obterDadosCompletosUsuario(usuarioLogadoNome);

      this.loginForm.patchValue({
        login: usuarioLogadoNome,
        nomeusu: dados?.nomeusu,
      });

      this.cdr.detectChanges();
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

    const { login, nomeusu, senhaAtual, novaSenha } = this.loginForm.value;
    const loginDigitado = (login || '').trim();
    const nomeDigitado = (nomeusu || '').trim();
    const novaSenhaDigitada = (novaSenha || '').trim();

    this.isSubmitting = true;
    this.cdr.detectChanges();

    // Chama direto a API do Node
    this.authService
      .alterarDadosUsuario(loginDigitado, senhaAtual, nomeDigitado, novaSenha.trim())
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
          this.snackBar.open('Dados alterados com sucesso!', 'OK', { duration: 3000 });

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
