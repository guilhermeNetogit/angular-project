import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuartoComponent } from './quarto';
import { QuartoDetalhe } from './quarto-detalhe/quarto-detalhe';
import { QuartoForm } from './quarto-form/quarto-form';
import { QuartoGuard } from '../guards/quarto.guard';
import { QuartoDeactivateGuard } from '../guards/quarto-deactivate.guard';

export const quartoRoutes: Routes = [
  {
    path: '',
    component: QuartoComponent,
    canActivateChild: [QuartoGuard],
    children: [
      { path: 'new', component: QuartoForm },
      { path: ':id', component: QuartoDetalhe },
      { path: ':id/edit', component: QuartoForm,
        canDeactivate: [QuartoDeactivateGuard]
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quartoRoutes)],
  exports: [RouterModule],
})
export class QuartoRoutingModule {}
