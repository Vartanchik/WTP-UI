import {Routes} from '@angular/router';
import {SectionUsersComponent} from './app/sections/section-users/section-users.component';
import {SectionNewProfileComponent} from './app/sections/section-new-profile/section-new-profile.component';
import {SectionHistoryComponent} from './app/sections/section-history/section-history.component';
import {SectionGamesComponent} from './app/sections/section-games/section-games.component';

export const appRoutes: Routes = [
    {path: 'users', component: SectionUsersComponent},
    {path: 'newProfile', component: SectionNewProfileComponent},
    {path: 'history', component: SectionHistoryComponent},
    {path: 'games', component: SectionGamesComponent},

    {path: '', redirectTo: '/users',pathMatch: 'full'}
];