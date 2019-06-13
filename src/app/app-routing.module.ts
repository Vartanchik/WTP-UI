import { TeamPageComponent } from './team/team-page/team-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionGamesComponent } from './sections/section-games/section-games.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { LockUserComponent } from './users/lock-user/lock-user.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { NotFoundComponent } from './users/not-found/not-found.component';
import { DotaComponent } from './global-players/dota/dota.component';
import { GtaComponent } from './global-players/gta/gta.component';
import { CsGoComponent } from './global-players/cs-go/cs-go.component';
import {RestoreComponent} from './account/restore/restore.component';
import { PlayerPageComponent } from './player/player-page/player-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'account', //component: AccountComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'changepassword', component: ChangePasswordComponent},
      { path: 'restore', component: RestoreComponent},
    ]
  },

  {
    path:'admin',
    children: [
      { path: 'users', component: UserListComponent },
      {path: 'history', component: SectionHistoryComponent},
      {path: 'games', component: SectionGamesComponent},
      { path: 'users/edit/:id', component: UserUpdateComponent },
      { path: 'users/block/:id', component: LockUserComponent },
      { path: 'users/create', component: UserCreateComponent },
      {path: '', redirectTo: 'users',pathMatch: 'full'},//component: UserListComponent},
      { path: '**', component: NotFoundComponent }
    ]
},


  { path: 'userprofile', component: UserProfileComponent },
  { path: 'player/:id', component: PlayerPageComponent },
  { path: 'team/:id', component: TeamPageComponent },

  {
    path:'players',
    children: [
      { 
        path: 'dota',
        component: DotaComponent
      },
      { 
        path: 'gta',
        component: GtaComponent
      },
      { 
        path: 'cs-go',
        component: CsGoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
