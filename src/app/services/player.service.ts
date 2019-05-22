import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig, providedInConfig } from './dataconfig';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) {}

  getPlayersOfUser(): Observable<[]> {
    return this.http.get<[]>(this.BaseURI + '/Player/GetPlayersOfUser');
  }
}
