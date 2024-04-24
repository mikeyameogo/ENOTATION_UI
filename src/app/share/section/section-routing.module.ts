import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilAgentComponent } from 'src/app/components/profil-agent/profil-agent.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  // { path:'admin', component: AdminDashboardComponent,
  // children: [
  //   {path:'', component:AdminContentComponent},
  //   {path:'profil-agent', component:ProfilAgentComponent},
  // ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
