import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeechComponent } from './speech/speech.component';
import { TeamsComponent } from './teams/teams.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  { path: '', 
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: SpeechComponent},
          { path: 'teams', component: TeamsComponent},
          { path: 'create', component: CrudComponent},
          { path: 'update', component: CrudComponent},
          { path: 'view', component: CrudComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
