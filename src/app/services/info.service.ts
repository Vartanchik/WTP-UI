import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig, providedInConfig } from './dataconfig';
import { IdItem } from '../interfaces/id-item';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly BaseURI = baseURIConfig;

  private selectedGame: IdItem;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<[]> {
    return this.http.get<[]>(this.BaseURI + '/Info/GetAllGames');
  }

  getSelectedGame(): IdItem {
    return this.selectedGame;
  }

  setSelectedGame(game: IdItem): void {
    this.selectedGame = game;
  }
}
