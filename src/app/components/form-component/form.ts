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
      nome: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(50)
      ]],
      email: ['', [Validators.required, Validators.email]],
      //endereco: {
        cep: ['',[Validators.maxLength(8)]],
        numero: [''],
        complemento: [''],
        logradouro: [''],
        bairro: [''],
        cidade: [''],
        uf: ['']
     // }
    });
  }

  enviarDados(): void {
    if (this.formulario.valid) {
      console.log('Dados do formulário:', this.formulario.value);

      // Aqui você envia os dados para a sua API / Service como JSON automaticamente
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
