import { IdItem } from './id-item';

export interface User {
    userName: string;
    email: string;
    photo: string;
    gender: IdItem,
    dateOfBirth: any;
    country: IdItem,
    steam: string,
    languages: IdItem[]
    players: []
    teams: [],
}
