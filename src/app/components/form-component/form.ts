import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { EstadoBr } from '../../shared/models/estadobr.models';
import { ConsultaCepService } from '../../shared/services/consulta-cep.service';
import { DropdownService } from '../../shared/services/dropdown.service';

export class ImmediateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid);
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class FormComponent implements OnInit {
  formulario!: FormGroup;
  matcherImediato = new ImmediateErrorStateMatcher();
  estados: EstadoBr[] = [];
  private urlApi = 'https://httpbin.org/post';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
  ) {}

  ngOnInit() {
    this.dropdownService.getEstadosBr().subscribe((dados) => {
      this.estados = dados;
      console.log(dados);
    });

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

    this.configurarValidacaoNumero();
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

    this.cepService.buscarCep(cep).subscribe({
      next: (dados) => {
        if (dados && !dados.erro) {
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

  private resetarDadosForm(): void {
    this.formulario.get('endereco')?.patchValue({
      logradouro: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    });
  }

  private configurarValidacaoNumero(): void {
    const cepControl = this.formulario.get('endereco.cep');
    const logradouroControl = this.formulario.get('endereco.logradouro');
    const numeroControl = this.formulario.get('endereco.numero');

    if (cepControl && logradouroControl && numeroControl) {
      // O 'merge' vai escutar as mudanças tanto no CEP quanto no Logradouro
      merge(cepControl.valueChanges, logradouroControl.valueChanges).subscribe(() => {
        const temCep = !!cepControl.value?.trim();
        const temLogradouro = !!logradouroControl.value?.trim();

        // Condição: Se pelo menos um estiver preenchido
        if (temCep || temLogradouro) {
          numeroControl.setValidators([Validators.required]);
        } else {
          numeroControl.clearValidators();
        }

        // Atualiza o estado visual e a validação do campo sem disparar eventos infinitos
        numeroControl.updateValueAndValidity({ emitEvent: false });
      });
    }
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
