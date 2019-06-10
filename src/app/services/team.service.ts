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
    return this.http.get<Team[]>(this.BaseURI + '/Team/UserTeams/' + userId);
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
    return this.http.delete<WtpResponse>(this.BaseURI + '/Team/RemovePlayerFromTeam?playerId=' + playerId + '&teamId=' + teamId);
  }

  acceptInvitation(invitation: number, isAccepted: boolean): Observable<WtpResponse> {
    const response = {
      invitationId: invitation,
      accept: isAccepted
    }
    return this.http.put<WtpResponse>(this.BaseURI + '/Team/AcceptInvitation', response);
  }

  invite(playerId: number, teamId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/Invite?playerId=' + playerId + '&teamId=' + teamId, null);
  }
}
