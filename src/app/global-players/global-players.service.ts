import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player.model';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig } from '../services/dataconfig';

@Injectable({
  providedIn: 'root'
})
export class GlobalPlayersService {

  private readonly BaseURI = baseURIConfig;
  private readonly playersUrl = '/Player/players';

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(
      `${this.BaseURI}${this.playersUrl}`, {
        params: {
          idGame: id.toString()
        }
      });
  }
}
