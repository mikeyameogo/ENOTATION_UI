import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FonctionnaireRoutingModule } from './fonctionnaire-routing.module';
import { FonctionnaireComponent } from './fonctionnaire.component';
import { CreerModifierFonctionnaireComponent } from './creer-modifier-fonctionnaire/creer-modifier-fonctionnaire.component';
import { DetailFonctionnaireComponent } from './detail-fonctionnaire/detail-fonctionnaire.component';
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
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    FonctionnaireComponent,
    CreerModifierFonctionnaireComponent,
    DetailFonctionnaireComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    CardModule,
    InputTextModule,
    DialogModule,
    DividerModule,
    ProgressBarModule,
    MessageModule,
    DropdownModule,
    AppCommonModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    PaginatorModule,
    InputMaskModule,
    FonctionnaireRoutingModule
  ]
})
export class FonctionnaireModule { }
