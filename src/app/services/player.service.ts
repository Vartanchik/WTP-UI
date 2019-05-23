import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig, providedInConfig } from './dataconfig';
import { Player } from '../interfaces/player';
import { WtpResponse } from '../interfaces/wtp-response';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) {}

  getPlayersOfUser(): Observable<[]> {
    return this.http.get<[]>(this.BaseURI + '/Player/GetPlayersOfUser');
  }

  createOrUpdatePlayer(body: Player): Observable<WtpResponse> {
    body.game = body.game[0];
    body.server = body.server[0];
    body.goal = body.goal[0];
    body.rank = body.rank[0];
    return this.http.put<WtpResponse>(this.BaseURI + '/Player/CreateOrUpdate', body);
  }
}
