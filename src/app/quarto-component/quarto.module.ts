import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QuartoComponent } from "./quarto";
import { QuartoDetalhe } from "./quarto-detalhe/quarto-detalhe";
import { QuartoForm } from "./quarto-form/quarto-form";
import { QuartoRoutingModule } from "./quarto.routing";

@NgModule({
  declarations: [],
  imports: [CommonModule, QuartoComponent, QuartoDetalhe, QuartoForm, QuartoRoutingModule]})

  export class QuartoModule {}
