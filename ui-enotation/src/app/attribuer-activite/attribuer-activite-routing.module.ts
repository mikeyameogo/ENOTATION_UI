import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttribuerActiviteComponent } from './attribuer-activite.component';

const routes: Routes = [
  {
    path:'', component: AttribuerActiviteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttribuerActiviteRoutingModule { }
