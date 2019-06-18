import { Injectable } from '@angular/core';
import { TeamFiltersModel } from './models/team-filters';
import { baseURIConfig } from '../services/dataconfig';
import { HttpClient } from '@angular/common/http';
import { TeamsPagination } from './models/team-pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalTeamsService {

  currentFields: TeamFiltersModel = {
    name: '',
    winRateLeftValue: 0,
    winRateRightValue: 100,
    membersLeftValue: 0,
    membersRightValue: 5,
    sortingField: '',
    sortingType: '',
    teamsOnPage: 5,
    selectedItemGoals: []
  }

  private readonly BaseURI = baseURIConfig;
  private readonly playersUrl = '/Team/teams/pagination';

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(gameId: number, pageId: number): Observable<TeamsPagination> 
  {
    return this.http.get<TeamsPagination>(
      `${this.BaseURI}${this.playersUrl}`, {
        params: {
          idGame: gameId.toString(),
          pageSize: this.currentFields.teamsOnPage.toString(),
          page: pageId.toString(),
          sortField: this.currentFields.sortingField,
          sortType: this.currentFields.sortingType,
          nameValue: this.currentFields.name,
          rankLeftValue: this.currentFields.winRateLeftValue.toString(),
          rankRightValue: this.currentFields.winRateRightValue.toString(),
          membersLeftValue: this.currentFields.membersLeftValue.toString(),
          membersRightValue: this.currentFields.membersRightValue.toString(),
          selectedGoals: this.currentFields.selectedItemGoals.toString()
        }
      });
  }

  pushUpdatedValues(value: TeamFiltersModel){
    this.currentFields = value;
  }

}
