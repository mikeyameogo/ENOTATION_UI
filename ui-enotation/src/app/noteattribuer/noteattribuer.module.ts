import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteattribuerRoutingModule } from './noteattribuer-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from '../shared/common/app-common.module';
import { NoteattribuerComponent } from './noteattribuer.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudToolbarComponent } from '../shared/common/crud-toolbar/crud-toolbar.component';
import { ToastModule } from 'primeng/toast';
import { AppModule } from '../app.module';
import { ActivationCompteModule } from '../public/activation-compte/activation-compte.module';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  declarations: [
    NoteattribuerComponent,

  ],
  imports: [
   CommonModule,
   ReactiveFormsModule,
   FormsModule,
   ButtonModule,
   CardModule,
   DividerModule,
   ChartModule,
   InputNumberModule,
   DropdownModule,
   KnobModule,
   DynamicDialogModule,
   TableModule,
   DialogModule,
   ProgressBarModule,
   MessageModule,
   AppCommonModule,
   MenubarModule,
   SplitButtonModule,
   ConfirmDialogModule,
   ProgressSpinnerModule,
   PaginatorModule,
    NoteattribuerRoutingModule
  ]
})
export class NoteattribuerModule { }
