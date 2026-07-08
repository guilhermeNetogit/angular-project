import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuartoRoutingModule } from './quarto.routing';
import { QuartoService } from './services/quarto.service';
import { QuartoDeactivateGuard } from '../guards/quarto-deactivate.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, QuartoRoutingModule],
  providers: [QuartoService, QuartoDeactivateGuard],
})
export class QuartoModule {}
