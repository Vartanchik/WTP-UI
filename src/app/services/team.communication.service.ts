import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../interfaces/team';

@Injectable()
export class TeamCommunicationService {

  private team: Team = {
    id: 0,
    name: '',
    photo: '',
    appUser: 0,
    game: '',
    server: '',
    goal: '',
    language: '',
    players: [],
    winRate: 0,
    invitations: []
  };
  private userId = new BehaviorSubject<number>(0);
  currentUserId = this.userId.asObservable();
  private listOfTeams = new BehaviorSubject<boolean>(true);
  currentListOfTeams = this.listOfTeams.asObservable();
  private createTeam = new BehaviorSubject<boolean>(false);
  currentCreateTeam = this.createTeam.asObservable();
  private editTeam = new BehaviorSubject<boolean>(false);
  currentEditTeam = this.editTeam.asObservable();
  private teamToEdit = new BehaviorSubject<Team>(this.team);
  currentTeamToEdit = this.teamToEdit.asObservable();
  private existingGames = new BehaviorSubject<string[]>([]);
  getExistingGames = this.existingGames.asObservable();

  constructor() {
  }

  changeUserId(id: number) {
    this.userId.next(id);
  }

  changeListOfTeams(status: boolean) {
    this.listOfTeams.next(status);
  }

  changeCreateTeam(status: boolean) {
    this.createTeam.next(status);
  }

  changeEditTeam(status: boolean) {
    this.editTeam.next(status);
  }

  changeTeamToEdit(team: Team) {
    this.teamToEdit.next(team);
  }

  setExistingGames(games: string[]) {
    this.existingGames.next(games);
  }
}
