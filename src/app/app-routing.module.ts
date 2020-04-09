import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', 
    component: LoginComponent
  },
  { path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { module: "dashboard" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
