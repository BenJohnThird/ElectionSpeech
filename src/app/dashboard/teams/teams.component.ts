import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { fadeAnimation } from 'src/app/route.animation';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  private subscriptions = [];
  public teamMembers: Array<any>;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dashboardService.getTeamMembers().subscribe(res => {
        this.teamMembers = res;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
