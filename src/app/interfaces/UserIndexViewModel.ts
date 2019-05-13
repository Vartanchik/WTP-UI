import { User } from './user';
import { UserPageViewModel } from './UserPageViewModel';
import { UserFilterViewModel } from './UserFilterViewModel';
import { UserSortViewModel } from './UserSortViewModel';

export class UserIndexViewModel {
    public users:User[];
    public pageViewModel:UserPageViewModel;
    public filterViewModel:UserFilterViewModel;
    public sortViewModel:UserSortViewModel;
}