import {User} from '../shared/user';
import {Admin} from '../shared/admin';
import { Game } from './game';

export interface History{
    id: number;
    admin: Admin;
    action: string;
    dateOfChange: Date;
    category: string;
    user: User;
    game: Game;
}