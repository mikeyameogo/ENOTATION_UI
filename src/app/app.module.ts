import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimengModule } from './share/primeng/primeng.module';
import { SectionModule } from './share/section/section.module';
import { ProfilAgentComponent } from './components/profil-agent/profil-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { PrimengRoutingModule } from './share/primeng/primeng-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './components/profil/profil.component';
import { PasswordResetInitComponent } from './components/password-reset-init/password-reset-init.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {InputMaskModule} from 'primeng/inputmask';
import {MenubarModule} from 'primeng/menubar';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ActivateCompteComponent } from './components/activate-compte/activate-compte.component';
import { FichesPosteComponent } from './components/fiches-poste/fiches-poste.component';
import { MinistereInstitutionComponent } from './components/ministere-institution/ministere-institution.component';
import {AccordionModule} from 'primeng/accordion';
import { AproposComponent } from './components/apropos/apropos.component';
import { ActiviteComponent } from './components/activite/activite.component';
import {SliderModule} from 'primeng/slider';


import { AgentNoteDashboardComponent } from './components/agentNote/agent-note-dashboard/agent-note-dashboard.component';
import { AgentNoteMenuComponent } from './components/agentNote/agent-note-menu/agent-note-menu.component';
import { AgentLandingComponent } from './components/agentNote/agent-landing/agent-landing.component';
import { AgentNotaireDashboardComponent } from './components/agentNotaire/agent-notaire-dashboard/agent-notaire-dashboard.component';
import { AgentNotaireMenuComponent } from './components/agentNotaire/agent-notaire-menu/agent-notaire-menu.component';
import { AgentNotaireLandingComponent } from './components/agentNotaire/agent-notaire-landing/agent-notaire-landing.component';
import {PasswordModule} from 'primeng/password';
import { FonctionnaireComponent } from './components/fonctionnaire/fonctionnaire.component';
import { CritereComponent } from './components/critere/critere.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ChangerAffiliationComponent } from './components/changer-affiliation/changer-affiliation.component';
import { DrhDashboardComponent } from './components/drh/drh-dashboard/drh-dashboard.component';
import { DrhLandingComponent } from './components/drh/drh-landing/drh-landing.component';
import { DrhMenuComponent } from './components/drh/drh-menu/drh-menu.component';
import { NoteOfficeComponent } from './components/note-office/note-office.component';
import { MesAgentsComponent } from './components/mes-agents/mes-agents.component';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';
import { MesNotesComponent } from './components/mes-notes/mes-notes.component';
import { GenererCodeAffiliationComponent } from './components/generer-code-affiliation/generer-code-affiliation.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { MonCodeComponent } from './components/mon-code/mon-code.component';
import { DetailAgentComponent } from './components/mes-agents/detail-agent/detail-agent.component';
import { PeriodeComponent } from './components/periode/periode.component';
import { AppCommonModule } from './common/app-common.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChartModule } from 'primeng/chart';
import { ProposeActiviteComponent } from './components/propose-activite/propose-activite.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProfilAgentComponent,
    ProfilComponent,
    PasswordResetInitComponent,
    LandingPageComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ActivateCompteComponent,
    FichesPosteComponent,
    MinistereInstitutionComponent,
    AproposComponent,
    ActiviteComponent,
    AgentNoteDashboardComponent,
    AgentNoteMenuComponent,
    AgentLandingComponent,
    AgentNotaireDashboardComponent,
    AgentNotaireMenuComponent,
    AgentNotaireLandingComponent,
    FonctionnaireComponent,
    CritereComponent,
    CategorieComponent,
    ChangerAffiliationComponent,
    DrhDashboardComponent,
    DrhLandingComponent,
    DrhMenuComponent,
    NoteOfficeComponent,
    MesAgentsComponent,
    MesNotesComponent,
    GenererCodeAffiliationComponent,
    MonCodeComponent,
    DetailAgentComponent,
    PeriodeComponent,
    ProposeActiviteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppCommonModule,
    SplitButtonModule, 
    ProgressBarModule,
    MenubarModule,
    DialogModule,
    MessageModule,
    FlexLayoutModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    DividerModule,
    MessageModule,
    PasswordModule,
    ConfirmDialogModule,
    PrimengModule,
    SectionModule,
    BrowserModule,
    BreadcrumbModule,
    InputMaskModule,
    DialogModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengRoutingModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    FileUploadModule,
    InputTextModule,
    SliderModule,
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
    AccordionModule,
    MultiSelectModule,
    ChartModule,
    InputNumberModule
  ],
  providers: [
    ConfirmationService, MessageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
