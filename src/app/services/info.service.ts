import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURIConfig, providedInConfig } from './dataconfig';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly BaseURI = baseURIConfig;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<[]> {
    return this.http.get<[]>(this.BaseURI + '/Info/GetAllGames');
  }
}
