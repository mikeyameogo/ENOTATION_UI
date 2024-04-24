import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PrimengRoutingModule } from './primeng-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import {FileUploadModule} from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule} from 'primeng/checkbox';
import { AutoCompleteModule} from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputTextModule,
    ContextMenuModule,
    MessageModule,
    PaginatorModule,
    SidebarModule,
    EditorModule,
    ScrollPanelModule,
    CardModule,
    ToastModule,
    TieredMenuModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    PanelModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    TooltipModule,
    DropdownModule,
    DividerModule, 
  ],
  providers: [
    MessageService,
  ],
})
export class PrimengModule { }
