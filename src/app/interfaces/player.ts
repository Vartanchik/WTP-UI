import {Invitation} from './invitation';

export interface Player {
  id: number;
  photo: string;
  name: string;
  game: string;
  server: string;
  goal: string;
  about: string;
  rank: string;
  decency: number;
  invitations: Invitation[];
}
