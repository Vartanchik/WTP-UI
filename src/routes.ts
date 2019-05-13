import {Routes} from '@angular/router';
import {SectionHistoryComponent} from './app/sections/section-history/section-history.component';
import {SectionGamesComponent} from './app/sections/section-games/section-games.component';
import {UserListComponent} from './app/users/user-list/user-list.component';
import {NotFoundComponent} from './app/users/not-found/not-found.component';
import { UserUpdateComponent } from './app/users/user-update/user-update.component';
import { UserCreateComponent } from './app/users/user-create/user-create.component';
import { LockUserComponent } from './app/users/lock-user/lock-user.component';

export const appRoutes: Routes = [
    {path: 'admin/users', component: UserListComponent},
    {path: 'admin/history', component: SectionHistoryComponent},
    {path: 'games', component: SectionGamesComponent},

    { path: 'admin/users/edit/:id', component: UserUpdateComponent },
    { path: 'admin/users/block/:id', component: LockUserComponent },
    { path: 'admin/users/create', component: UserCreateComponent },
    {path: '', redirectTo: '/admin/users',pathMatch: 'full'},//component: UserListComponent},
    //{path: '', redirectTo: '/users',pathMatch: 'full'},
    { path: '**', component: NotFoundComponent }
];