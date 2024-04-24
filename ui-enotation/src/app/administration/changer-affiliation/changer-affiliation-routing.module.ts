import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangerAffiliationComponent } from './changer-affiliation.component';

const routes: Routes = [
  {
    path: '', component: ChangerAffiliationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangerAffiliationRoutingModule { }
