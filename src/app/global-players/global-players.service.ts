import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig } from '../services/dataconfig';
import { PlayersPagination } from './models/players-pagination.model';
import { PlayerFiltersModel } from './models/PlayerFilters';
import { DotaComponent } from './dota/dota.component';
import { CsGoComponent } from './cs-go/cs-go.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalPlayersService {

  currentGame: number = 1;

  currentFields: PlayerFiltersModel = {
    name: '',
    rankLeft: 0,
    rankRight: 100,
    decencyLeft: 0,
    decencyRight: 10000,
    sortingField: '',
    sortingType: '',
    playersOnPage: 5
  }
  
  private readonly BaseURI = baseURIConfig;
  private readonly playersUrl = '/Player/players/pagination';

  constructor(
    private http: HttpClient,
  ) { }

  getPlayers(gameId: number, pageId: number): Observable<PlayersPagination> {
    return this.http.get<PlayersPagination>(
      `${this.BaseURI}${this.playersUrl}`, {
        params: {
          idGame: gameId.toString(),
          pageSize: this.currentFields.playersOnPage.toString(),
          page: pageId.toString(),
          sortField: this.currentFields.sortingField,
          sortType: this.currentFields.sortingType,
          nameValue: this.currentFields.name,
          rankLeftValue: this.currentFields.rankLeft.toString(),
          rankRightValue: this.currentFields.rankRight.toString(),
          decencyLeftValue: this.currentFields.decencyLeft.toString(),
          decencyRightValue: this.currentFields.decencyRight.toString() 
        }
      });
  }

  pushUpdatedValues(value: PlayerFiltersModel){
    this.currentFields = value;
  }

  //communication between players components and filter component 
  private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }

  pushCurrentGame(value: number){
    this.currentGame = value;
  }
}
