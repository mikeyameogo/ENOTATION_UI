import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrhHomeComponent } from './drh-home/drh-home.component';

const routes: Routes = [
  { path: '', data: {breadcrumb: 'Tableau de bord DRH'}, component: DrhHomeComponent },
  { path: 'mes-agents', data: {breadcrumb: 'Mes agents'}, loadChildren: () => import('../mes-agents/mes-agents.module').then(m => m.MesAgentsModule) },
  { path: 'mes-activites', data: {breadcrumb: 'Gestion des activites'}, loadChildren: () => import('../activite/activite.module').then(m => m.ActiviteModule) },
  { path: 'mes-notes', data: {breadcrumb: 'Liste des notes'}, loadChildren: () => import('../administration/parametre/mes-notes/mes-notes.module').then(m => m.MesNotesModule) },
  { path: 'note-office', data: {breadcrumb: 'Gestion des notes d\'office'}, loadChildren: () => import('./note-office/note-office.module').then(m => m.NoteOfficeModule) },
  { path: 'fiches-poste', data: {breadcrumb: 'Liste des fiches de postes'}, loadChildren: () => import('../administration/parametre/fiches-poste/fiches-poste.module').then(m => m.FichesPosteModule) },
  { path: 'change-affiliation', data: {breadcrumb: 'Changer Affiliation'}, loadChildren: () => import('../administration/changer-affiliation/changer-affiliation.module').then(m => m.ChangerAffiliationModule) },
  { path: 'codes', data: {breadcrumb: 'Affichage du code'}, loadChildren: () => import('../administration/parametre/code/code.module').then(m => m.CodeModule) },
  { path: 'noteattribuer', data: {breadcrumb: 'Gestion des notes attribuer'}, loadChildren: () => import('../noteattribuer/noteattribuer.module').then(m => m.NoteattribuerModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrhRoutingModule { }
