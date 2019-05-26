import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../interfaces/player';

@Injectable()
export class PlayerCommunicationServer {

    constructor() { }

    private userId = new BehaviorSubject<number>(0);
    private listOfPlayers = new BehaviorSubject<boolean>(true);
    private createPlayer = new BehaviorSubject<boolean>(false);

    currentUserId = this.userId.asObservable();
    currentListOfPlayers = this.listOfPlayers.asObservable();
    currentCreatePlayer = this.createPlayer.asObservable();

    changeUserId(id: number) {
        this.userId.next(id);
    }
    changeListOfPlayers(status: boolean) {
        this.listOfPlayers.next(status);
    }
    changeCreatePlayer(status: boolean) {
        this.createPlayer.next(status);
    }
}
