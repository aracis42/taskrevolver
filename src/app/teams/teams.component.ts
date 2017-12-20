import { Component, OnInit } from '@angular/core';

import { TeamService } from './shared/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamService]
})
export class TeamsComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

}
