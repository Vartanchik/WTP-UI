import {Player} from './player.model';
import {PageView} from './page-view.model';

export interface PlayersPagination {
  players: Player[];
  pageViewModel: PageView;
}
