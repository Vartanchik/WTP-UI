import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig, dropdownListGamesConfig } from './dataconfig';
import { WtpResponse } from '../interfaces/wtp-response';
import { Team } from '../interfaces/team';
import { Invitation } from '../interfaces/invitation';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) { }

  getTeams(userId: number): Observable<Team[]> {
    return this.http.get<Team[]>(this.BaseURI + '/Team/ListByUserId?userId=' + userId);
  }
  getTeamId(gameId: number): Observable<number> {
    return this.http.get<number>(this.BaseURI + '/Team/GetTeamIdByGameId?gameId=' + gameId);
  }

  getTeamPlayersQuantity(gameId: number): Observable<number> {
    return this.http.get<number>(this.BaseURI + '/Team/GetTeamPlayersQuantityByGame?gameId=' + gameId);
  }

  createTeam(body: Team): Observable<WtpResponse> {
    const team = {
      name: body.name,
      gameId: Object.keys(body.game[0]).map(key => body.game[0][key])[0],
      serverId: Object.keys(body.server[0]).map(key => body.server[0][key])[0],
      goalId: Object.keys(body.goal[0]).map(key => body.goal[0][key])[0],
      //   language: Object.keys(body.language[0]).map(key => body.language[0][key])[0],
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Team', team);
  }

  updateTeam(body: Team): Observable<WtpResponse> {
    const team = {
      id: body.id,
      name: body.name,
      serverId: Object.keys(body.server[0]).map(key => body.server[0][key])[0],
      goalId: Object.keys(body.goal[0]).map(key => body.goal[0][key])[0],
      //   language: Object.keys(body.language[0]).map(key => body.language[0][key])[0],
    };
    return this.http.put<WtpResponse>(this.BaseURI + '/Team', team);
  }

  deleteTeam(teamId: number): Observable<WtpResponse> {
    return this.http.delete<WtpResponse>(this.BaseURI + '/Team?teamId=' + teamId);
  }

  sendPhoto(form: FormData, teamId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/UpdateLogo?teamId=' + teamId, form);
  }

  removePlayerFromTeam(playerId: number, teamId: number): Observable<WtpResponse> {
    return this.http.put<WtpResponse>(this.BaseURI + '/Team/RemovePlayerFromTeam?playerId=' + playerId + '&teamId=' + teamId, null);
  }

  getInvitationsByUserId(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(this.BaseURI + '/Team/InvitationTeamListByUserId');
  }

  acceptInvitation(invitationId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/AcceptInvitation?invitationId=' + invitationId, null);
  }

  declineInvitation(invitationId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/DeclineInvitation?invitationId=' + invitationId, null);
  }

  invitePlayer(playerId: number, teamId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/InvitePlayer?playerId=' + playerId + '&teamId=' + teamId, null);
  }

  inviteTeam(playerId: number, teamId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/InviteTeam?playerId=' + playerId + '&teamId=' + teamId, null);
  }
}
