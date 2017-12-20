import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/team.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-teams-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (form.value.$key === null) {
      this.teamService.insertTeam(form.value);
    } else {
      this.teamService.updateTeam(form.value);
    }
    this.resetForm(form);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.teamService.selectedTeam = {
        $key: null,
        title: '',
        description: '',
      };
    }
  }

  onDelete(form: NgForm) {
    if (confirm('Are you sure to delete this this team? The data of the team and the associated subelements will be lost.') === true) {
      this.teamService.deleteTeam(form.value.$key);
      this.resetForm(form);
    }
  }

}
