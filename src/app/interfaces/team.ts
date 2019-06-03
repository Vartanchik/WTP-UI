import { Player } from './player';
export interface Team {
    id: number;
    name: string;
    photo: string;
    coach: number;
    game: string;
    server: string;
    goal: string;
    language: string;
    players: Player[];
    winRate: number;
}
