import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig } from '../services/dataconfig';
import { PlayersPagination } from './models/players-pagination.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalPlayersService {

  private readonly BaseURI = baseURIConfig;
  private readonly playersUrl = '/Player/players/pagination';

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(gameId: number, pageId: number): Observable<PlayersPagination> {
    return this.http.get<PlayersPagination>(
      `${this.BaseURI}${this.playersUrl}`, {
        params: {
          idGame: gameId.toString(),
          page: pageId.toString()
        }
      });
  }
}
