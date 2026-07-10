import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class FormComponent implements OnInit {
  formulario!: FormGroup;
  private urlApi = 'https://httpbin.org/post';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      ddd: [''],
      telefone: [],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]],
        numero: [''],
        complemento: [''],
        logradouro: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
      }),
    });
  }

  aplicarMascaraCep(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 5) {
      valor = `${valor.slice(0, 5)}-${valor.slice(5, 8)}`;
    }

    // Sincroniza o valor formatado com o FormGroup do Angular
    this.formulario.get('endereco.cep')?.setValue(valor, { emitEvent: false });
  }

  buscarCep() {
    const cep = this.formulario.get('endereco.cep')?.value;

    const cepLimpo = cep?.replace(/\D/g, '');

    if (cepLimpo && cepLimpo.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.formulario.get('ddd')?.setValue(dados.ddd);
            this.formulario.get('endereco')?.patchValue({
              logradouro: dados.logradouro,
              complemento: dados.complemento,
              bairro: dados.bairro,
              cidade: dados.localidade,
              uf: dados.uf,
            });
          } else {
            alert('CEP não encontrado.');
            this.resetarDadosForm();
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar o CEP:', erro);
          this.resetarDadosForm();
        },
      });
    }
  }
  private resetarDadosForm(): void {
    this.formulario.get('endereco')?.patchValue({
      logradouro: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    });
  }

  enviarDados(): void {
    if (this.formulario.valid) {
      console.log('Dados do formulário:', this.formulario.value);
      this.http.post(this.urlApi, this.formulario.value).subscribe({
        next: (dados) => {
          console.log('Resposta da API', dados);
          this.formulario.reset();
        },
        error: (erro) => {
          console.error('Erro ao enviar:', erro);
        },
      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}
