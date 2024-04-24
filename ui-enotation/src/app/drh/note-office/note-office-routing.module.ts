import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteOfficeComponent } from './note-office.component';

const routes: Routes = [
  {
    path: '', component: NoteOfficeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteOfficeRoutingModule { }
