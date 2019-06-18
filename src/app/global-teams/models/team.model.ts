import { Player } from 'src/app/global-players/models/player.model';

export interface Team {
    id: number;
    name: string;
    game: string;
    photo: string;
    server: string;
    goal: string;
    winRate: number;
    players: Player[];
}