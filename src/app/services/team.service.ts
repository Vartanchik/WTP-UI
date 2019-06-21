import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseURIConfig} from './dataconfig';
import {WtpResponse} from '../interfaces/wtp-response';
import {Team} from '../interfaces/team';
import {TeamForTeamPage} from '../interfaces/team-for-team-page';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) {
  }

  getTeamById(teamId: number): Observable<TeamForTeamPage> {
    return this.http.get<TeamForTeamPage>(this.BaseURI + '/Team/' + teamId);
  }

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
    return this.http.delete<WtpResponse>(this.BaseURI + '/Team/' + teamId);
  }

  sendPhoto(form: FormData, teamId: number): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Team/UpdateLogo/' + teamId, form);
  }

  removePlayerFromTeam(playerId: number, teamId: number): Observable<WtpResponse> {
    return this.http.delete<WtpResponse>(this.BaseURI + '/Team/RemovePlayerFromTeam?playerId=' + playerId + '&teamId=' + teamId);
  }

  acceptInvitation(invitationId: number, accept: boolean): Observable<WtpResponse> {
    const body = {
      invitationId,
      accept
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Invitation/InvitationResponse', body);
  }

  invite(playerId: number, teamId: number): Observable<WtpResponse> {
    const body = {
      playerId,
      teamId
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Invitation', body);
  }
}
