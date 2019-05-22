import { IdItem } from './id-item';
import { User } from './user';

export interface Player {
    id: number;
    name: string;
    user: User;
    game: IdItem;
    server: IdItem;
    goal: IdItem;
    about: string;
    rank: IdItem;
}