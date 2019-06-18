import { User } from './UserDataForAdmin';
import { UserPageViewModel } from './userPageViewModel';
import { UserFilterViewModel } from './userFilterViewModel';
import { UserSortViewModel } from './userSortViewModel';

export class UserIndexViewModel {
    public users:User[];
    public pageViewModel:UserPageViewModel;
    public filterViewModel:UserFilterViewModel;
    public sortViewModel:UserSortViewModel;
}