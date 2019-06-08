import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable()
export class TeamCommunicationService {

    constructor() { }

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
    private listOfTeams = new BehaviorSubject<boolean>(true);
    private createTeam = new BehaviorSubject<boolean>(false);
    private editTeam = new BehaviorSubject<boolean>(false);
    private teamToEdit = new BehaviorSubject<Team>(this.team);
    private existingGames = new BehaviorSubject<string[]>([]);

    currentUserId = this.userId.asObservable();
    currentListOfTeams = this.listOfTeams.asObservable();
    currentCreateTeam = this.createTeam.asObservable();
    currentEditTeam = this.editTeam.asObservable();
    currentTeamToEdit = this.teamToEdit.asObservable();
    getExistingGames = this.existingGames.asObservable();

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
