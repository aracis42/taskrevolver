import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Team } from './team.model';

@Injectable()
export class TeamService {
  teamList: AngularFireList<any>;
  selectedTeam: Team = new Team();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.teamList = this.firebase.list('teams');
    return this.teamList;
  }

  insertTeam(insertteam: Team) {
    this.teamList.push({
      title: insertteam.title,
      description: insertteam.description
    });
  }

  updateTeam(updateteam: Team) {
    this.teamList.update(updateteam.$key, {
      title: updateteam.title,
      description: updateteam.description
    });
  }

  deleteTeam(key: string) {
    this.teamList.remove(key);
  }
}
