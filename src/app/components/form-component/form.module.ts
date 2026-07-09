import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormComponent,ReactiveFormsModule],
})
export class FormModule {}
