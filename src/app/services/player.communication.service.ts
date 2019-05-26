import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../interfaces/player';

@Injectable()
export class PlayerCommunicationServer {

    constructor() { }

    private player: Player = {
        id: 0,
        name: 'Default',
        game: 'Default',
        server: '',
        goal: '',
        about: '',
        rank: '',
        decency: 0
      };

    private userId = new BehaviorSubject<number>(0);
    private listOfPlayers = new BehaviorSubject<boolean>(true);
    private createPlayer = new BehaviorSubject<boolean>(false);
    private editPlayer = new BehaviorSubject<boolean>(false);
    private playerToEdit = new BehaviorSubject<Player>(this.player);

    currentUserId = this.userId.asObservable();
    currentListOfPlayers = this.listOfPlayers.asObservable();
    currentCreatePlayer = this.createPlayer.asObservable();
    currentEditPlayer = this.editPlayer.asObservable();
    currentPlayerToEdit = this.playerToEdit.asObservable();

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
}
