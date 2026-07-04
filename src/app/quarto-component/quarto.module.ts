import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuartoRoutingModule } from './quarto.routing';
import { QuartoService } from './services/quarto.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, QuartoRoutingModule],
  providers: [QuartoService]
})
export class QuartoModule {}
