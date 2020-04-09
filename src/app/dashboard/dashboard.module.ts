import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SpeechComponent, NgbdModalConfirmAutofocus, NgbdModalShare } from './speech/speech.component';
import { TeamsComponent } from './teams/teams.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard.service';
import { CrudComponent } from './crud/crud.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModule } from '../shared/bootstrap/bootstrap.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SpeechComponent, TeamsComponent, DashboardComponent, CrudComponent, NgbdModalConfirmAutofocus, NgbdModalShare],
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModule,
    DashboardRoutingModule
  ], 
  entryComponents: [NgbdModalConfirmAutofocus, NgbdModalShare],
  providers: [DashboardService, DatePipe]
})
export class DashboardModule { }
