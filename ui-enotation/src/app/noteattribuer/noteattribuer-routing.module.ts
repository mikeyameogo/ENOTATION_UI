import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteattribuerComponent } from './noteattribuer.component';

//const routes: Routes = [];
const routes: Routes = [
    {
      path: '', component: NoteattribuerComponent,
    },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteattribuerRoutingModule { }
