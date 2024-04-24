import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ChartModule} from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminMenuComponent,
    AdminFooterComponent,
    AdminContentComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    InputNumberModule,
    CardModule,
    FormsModule,
    PasswordModule,
    ChartModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    DividerModule,
    PrimengModule,
    MessageModule,
    ProgressBarModule,
    DialogModule,
    AppAsideModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    IconModule, 
    IconSetModule,
    PerfectScrollbarModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    SectionRoutingModule,
   
  ],
  providers: [
    IconSetService
  ],
})
export class SectionModule { }
