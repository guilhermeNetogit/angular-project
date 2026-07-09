import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class FormComponent implements OnInit{

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

   enviarDados(): void {
    if (this.formulario.valid) {
      console.log('Dados do formulário:', this.formulario.value);
      // Aqui você envia os dados para a sua API / Service
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

}
