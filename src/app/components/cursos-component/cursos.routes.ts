import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos';
import { NgModule } from '@angular/core';
import { CursosFormComponent } from './cursos-form-component/cursos-form/cursos-form';
import { cursoResolver } from './guards/curso-resolver.guard';

const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'novo', component: CursosFormComponent, resolve: { curso: cursoResolver } },
  { path: 'editar/:id', component: CursosFormComponent, resolve: { curso: cursoResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
