import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { DashboardAdministrationComponent } from './dashboard-administration.component';
import { DividerModule } from 'primeng/divider';

import { MessagesModule } from 'primeng/messages';
import { ActionsToolbarIudComponent } from '../shared/comon/actions-toolbar-iud/actions-toolbar-iud.component';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CrudToolbarComponent } from '../shared/comon/crud-toolbar/crud-toolbar.component';
import { ChangerAffiliationComponent } from './changer-affiliation/changer-affiliation.component';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { NoteOfficeComponent } from '../drh/note-office/note-office.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MesNotesComponent } from './parametre/mes-notes/mes-notes.component';
import { CodeMinistreComponent } from './parametre/code-ministre/code-ministre.component';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    DashboardAdministrationComponent,
    ActionsToolbarIudComponent,
    CrudToolbarComponent,
    CrudToolbarComponent,
    ChangerAffiliationComponent,
    CrudToolbarComponent,
    NoteOfficeComponent,
    CodeMinistreComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    DividerModule,
    FormsModule,
    CardModule,
    InputNumberModule,
    MessagesModule,
    ButtonModule,
    KnobModule,
    ChartModule,
    TableModule,
    ToastModule,
    DropdownModule,
    InputMaskModule
  ],
  exports: [
    MessagesModule,
    ActionsToolbarIudComponent,
    CrudToolbarComponent
  ]
})
export class AdministrationModule { }
