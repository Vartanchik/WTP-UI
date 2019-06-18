import { Player } from './player';
import { Invitation } from './invitation';
export interface Team {
    id: number;
    name: string;
    photo: string;
    appUser: number;
    game: string;
    server: string;
    goal: string;
    language: string;
    players: Player[];
    winRate: number;
    invitations: Invitation[];
}
