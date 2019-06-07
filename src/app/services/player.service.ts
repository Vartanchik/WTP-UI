import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig } from './dataconfig';
import { Player } from '../interfaces/player';
import { WtpResponse } from '../interfaces/wtp-response';
import { Invitation } from '../interfaces/invitation';
import { PlayerForPlayerPage } from '../interfaces/player-for-player-page';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) { }

  getPlayerById(playerId: number): Observable<PlayerForPlayerPage> {
    return this.http.get<PlayerForPlayerPage>(this.BaseURI + '/Player?playerId=' + playerId);
  }

  getPlayersByUserId(userId: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.BaseURI + '/Player/GetPlayersByUser?userId=' + userId);
  }

  getPlayersByTeamId(teamId: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.BaseURI + '/Player/GetPlayersByTeam?teamId=' + teamId);
  }

  createPlayer(body: Player): Observable<WtpResponse> {
    const player = {
      name: body.name,
      gameId: Object.keys(body.game[0]).map(key => body.game[0][key])[0],
      serverId: Object.keys(body.server[0]).map(key => body.server[0][key])[0],
      goalId: Object.keys(body.goal[0]).map(key => body.goal[0][key])[0],
      about: body.about,
      rankId: Object.keys(body.rank[0]).map(key => body.rank[0][key])[0],
      decency: body.decency,
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Player', player);
  }

  updatePlayer(body: Player): Observable<WtpResponse> {
    const player = {
      id: body.id,
      name: body.name,
      serverId: Object.keys(body.server[0]).map(key => body.server[0][key])[0],
      goalId: Object.keys(body.goal[0]).map(key => body.goal[0][key])[0],
      about: body.about,
      rankId: Object.keys(body.rank[0]).map(key => body.rank[0][key])[0],
      decency: body.decency,
    };
    return this.http.put<WtpResponse>(this.BaseURI + '/Player', player);
  }

  deletePlayer(gameId: number): Observable<WtpResponse> {
    return this.http.delete<WtpResponse>(this.BaseURI + '/Player?playerGameId=' + gameId);
  }

  getInvitationsByUserId(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(this.BaseURI + '/Player/InvitationPlayerListByUserId');
  }

}
