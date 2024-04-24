import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin-guard';
import { AgentNotaireGuard } from './auth/agent-notaire-guard';
import { AgentNoteGuard } from './auth/agent-note-guard';
import { AuthGuard } from './auth/auth.guard';
import { ActivateCompteComponent } from './components/activate-compte/activate-compte.component';
import { AgentNotaireDashboardComponent } from './components/agentNotaire/agent-notaire-dashboard/agent-notaire-dashboard.component';
import { AgentNotaireLandingComponent } from './components/agentNotaire/agent-notaire-landing/agent-notaire-landing.component';
import { AgentLandingComponent } from './components/agentNote/agent-landing/agent-landing.component';
import { AgentNoteDashboardComponent } from './components/agentNote/agent-note-dashboard/agent-note-dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { CritereComponent } from './components/critere/critere.component';
import { FichesPosteComponent } from './components/fiches-poste/fiches-poste.component';
import { FonctionnaireComponent } from './components/fonctionnaire/fonctionnaire.component';
import { MinistereInstitutionComponent } from './components/ministere-institution/ministere-institution.component';
import { PasswordResetFinishComponent } from './components/password-reset-finish/password-reset-finish.component';
import { PasswordResetInitComponent } from './components/password-reset-init/password-reset-init.component';
import { ProfilAgentComponent } from './components/profil-agent/profil-agent.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { AdminContentComponent } from './share/section/admin-content/admin-content.component';
import { AdminDashboardComponent } from './share/section/admin-dashboard/admin-dashboard.component';
import { ActiviteComponent } from './components/activite/activite.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { ChangerAffiliationComponent } from './components/changer-affiliation/changer-affiliation.component';
import { DrhLandingComponent } from './components/drh/drh-landing/drh-landing.component';
import { AdminDrhGuard } from './auth/admin-drh-guard';
import { DrhDashboardComponent } from './components/drh/drh-dashboard/drh-dashboard.component';
import { NoteOfficeComponent } from './components/note-office/note-office.component';
import { MesAgentsComponent } from './components/mes-agents/mes-agents.component';
import { MesNotesComponent } from './components/mes-notes/mes-notes.component';
import { GenererCodeAffiliationComponent } from './components/generer-code-affiliation/generer-code-affiliation.component';
import { MonCodeComponent } from './components/mon-code/mon-code.component';
import { DetailAgentComponent } from './components/mes-agents/detail-agent/detail-agent.component';
import { PeriodeComponent } from './components/periode/periode.component';
import { ProposeActiviteComponent } from './components/propose-activite/propose-activite.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent,

children:[
  { path: '', component: HomeComponent},

  {path:'login', component:LoginComponent},
  {path:'activation-compte', component:ActivateCompteComponent},
  {path:'fiches-poste', component:FichesPosteComponent},
  {path:'activite', component:ActiviteComponent},
  {path:'apropos', component:AproposComponent},
  {path:'mot-de-passe-oublier', component:PasswordResetInitComponent},
  {path:'reset-password', component:PasswordResetFinishComponent},
]
},



{ path:'agent', component: AgentLandingComponent,  canActivate: [AuthGuard, AgentNoteGuard],
children: [
  {path:'', component:AgentNoteDashboardComponent},
  {path:'change-affiliation', component:ChangerAffiliationComponent},
  {path:'activite', component:ActiviteComponent},
  {path:'mes-notes', component:MesNotesComponent}, 
]
},

{ path:'superieur', component: AgentNotaireLandingComponent,  canActivate: [AuthGuard, AgentNotaireGuard],
children: [
  {path:'', component:AgentNotaireDashboardComponent},
  {path:'change-affiliation', component:ChangerAffiliationComponent},
  {path:'mes-agents', component:MesAgentsComponent, children:[{path:'detail-agent',component:DetailAgentComponent}]},
  {path:'activite', component:ActiviteComponent},
  {path:'mes-notes', component:MesNotesComponent},
  {path:'code-genere', component:GenererCodeAffiliationComponent},
  {path:'mon-code', component:MonCodeComponent},
  {path:'proposer/:matricule', component:ProposeActiviteComponent}



  
]
},


{ path:'drh', component: DrhLandingComponent,  canActivate: [AuthGuard, AdminDrhGuard],
children: [
  {path:'', component:DrhDashboardComponent},
  {path:'mes-agents', component:MesAgentsComponent},
  {path:'activite', component:ActiviteComponent},
  {path:'mes-notes', component:MesNotesComponent},
  {path:'change-affiliation', component:ChangerAffiliationComponent},
  {path:'note-office', component:NoteOfficeComponent},
  {path:'code-genere', component:GenererCodeAffiliationComponent},
  {path:'mon-code', component:MonCodeComponent},
  {path:'fiches-postes', component:FichesPosteComponent}
]
},

  // { path: 'login', component: LoginComponent },
  { path:'admin', component: AdminDashboardComponent,  canActivate: [AuthGuard, AdminGuard],
  children: [
    {path:'', component:AdminContentComponent},
    {path:'profil-agents', component:ProfilAgentComponent},
    {path:'profils', component:ProfilComponent},
    {path:'fonctionnaires', component:FonctionnaireComponent},
    {path:'criteres', component:CritereComponent},
    {path:'categories', component:CategorieComponent},
    {path:'ministere-institution', component:MinistereInstitutionComponent},
    {path:'periode', component:PeriodeComponent}
  ]
  },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
