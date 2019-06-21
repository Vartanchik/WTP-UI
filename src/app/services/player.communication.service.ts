import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Player} from '../interfaces/player';

@Injectable()
export class PlayerCommunicationServer {

  private player: Player = {
    id: 0,
    photo: '',
    name: 'Default',
    game: 'Default',
    server: '',
    goal: '',
    about: '',
    rank: '',
    decency: 0,
    invitations: []
  };
  private userId = new BehaviorSubject<number>(0);
  currentUserId = this.userId.asObservable();
  private listOfPlayers = new BehaviorSubject<boolean>(true);
  currentListOfPlayers = this.listOfPlayers.asObservable();
  private createPlayer = new BehaviorSubject<boolean>(false);
  currentCreatePlayer = this.createPlayer.asObservable();
  private editPlayer = new BehaviorSubject<boolean>(false);
  currentEditPlayer = this.editPlayer.asObservable();
  private playerToEdit = new BehaviorSubject<Player>(this.player);
  currentPlayerToEdit = this.playerToEdit.asObservable();
  private existingGames = new BehaviorSubject<string[]>([]);
  getExistingGames = this.existingGames.asObservable();

  constructor() {
  }

  changeUserId(id: number) {
    this.userId.next(id);
  }

  changeListOfPlayers(status: boolean) {
    this.listOfPlayers.next(status);
  }

  changeCreatePlayer(status: boolean) {
    this.createPlayer.next(status);
  }

  changeEditPlayer(status: boolean) {
    this.editPlayer.next(status);
  }

  changePlayerToEdit(player: Player) {
    this.playerToEdit.next(player);
  }

  setExistingGames(games: string[]) {
    this.existingGames.next(games);
  }
}
