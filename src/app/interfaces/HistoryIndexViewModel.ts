import { History } from './history';
import { UserPageViewModel } from './userPageViewModel';
import { HistoryFilterViewModel } from './HistoryFilterViewModel';
import { HistorySortViewModel } from './historySortViewModel';

export class HistoryIndexViewModel
{
    public histories:History[];
    public pageViewModel:UserPageViewModel;
    public filterViewModel:HistoryFilterViewModel;
    public sortViewModel:HistorySortViewModel;
}