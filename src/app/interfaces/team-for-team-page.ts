import {PlayerForPlayerPage} from './player-for-player-page';

export interface TeamForTeamPage {
  id: number;
  name: string;
  photo: string;
  appUser: number;
  game: string;
  server: string;
  goal: string;
  players: PlayerForPlayerPage[];
  winRate: number;
}
