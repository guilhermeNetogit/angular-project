import { RouterModule, Routes } from "@angular/router";
import { CursosComponent } from "./cursos";
import { NgModule } from "@angular/core";
import { CursosFormComponent } from "./cursos-form-component/cursos-form/cursos-form";

const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'novo', component: CursosFormComponent },
  { path: 'editar/:id', component: CursosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule],
})

export class CursosRoutingModule {}
