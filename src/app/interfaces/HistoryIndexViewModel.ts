import { History } from './history';
import { UserPageViewModel } from './UserPageViewModel';
import { HistoryFilterViewModel } from './HistoryFilterViewModel';
import { HistorySortViewModel } from './HistorySortViewModel';

export class HistoryIndexViewModel
{
    public histories:History[];
    public pageViewModel:UserPageViewModel;
    public filterViewModel:HistoryFilterViewModel;
    public sortViewModel:HistorySortViewModel;
}