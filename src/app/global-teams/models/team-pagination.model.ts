import {PageView} from './page-view.model';
import {Team} from './team.model';

export interface TeamsPagination {
  teams: Team[];
  pageViewModel: PageView;
}
