import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth/auth.interceptor';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {AccountService} from './services/account.service';
import {LoginComponent} from './account/login/login.component';
import {RegistrationComponent} from './account/registration/registration.component';
import {UserProfileComponent} from './userprofile/userprofile.component';
import {UserprofileService} from './services/userprofile.service';
import {ForgotPasswordComponent} from './account/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './account/reset-password/reset-password.component';
import {ChangePasswordComponent} from './account/change-password/change-password.component';
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CommunicationService} from './services/communication.service';
import {GameSwitchButtonComponent} from './home/game-switch-button/game-switch-button.component';
import {SectionHistoryComponent} from './sections/section-history/section-history.component';
import {SectionGamesComponent} from './sections/section-games/section-games.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserUpdateComponent} from './users/user-update/user-update.component';

import {UserService} from './services/user.service';
import {NotFoundComponent} from './users/not-found/not-found.component';
import {UserCreateComponent} from './users/user-create/user-create.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {LockUserComponent} from './users/lock-user/lock-user.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ConfirmDeleteComponent} from './userprofile/confirm-delete/confirm-delete.component';
import {GlobalPlayersModule} from './global-players/global-players.module';
import {GlobalTeamsModule} from './global-teams/global-teams.module';
import {RestoreComponent} from './account/restore/restore.component';
import {PlayerProfileCreateComponent} from './player/player-profile-create/player-profile.component';
import {PlayerProfileListComponent} from './player/player-profile-list/player-profile-list.component';
import {PlayerCommunicationServer} from './services/player.communication.service';
import {PlayerService} from './services/player.service';
import {PlayerProfileEditComponent} from './player/player-profile-edit/player-profile-edit.component';
import {TeamProfileListComponent} from './team/team-profile-list/team-profile-list.component';
import {TeamService} from './services/team.service';
import {TeamCommunicationService} from './services/team.communication.service';
import {TeamProfileCreateComponent} from './team/team-profile-create/team-profile-create.component';
import {TeamProfileEditComponent} from './team/team-profile-edit/team-profile-edit.component';
import {PlayerPageComponent} from './player/player-page/player-page.component';
import {TeamPageComponent} from './team/team-page/team-page.component';

import {
  EditService,
  FilterService,
  GridModule,
  GroupService,
  PageService,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import {MatTableModule, MatTreeModule} from '@angular/material';
import {CdkTreeModule} from '@angular/cdk/tree';
import {AdminPlayerListComponent} from './admin-player-list/admin-player-list.component';

import {NumericTextBoxModule} from '@syncfusion/ej2-angular-inputs';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminGameListComponent} from './admin-game-list/admin-game-list.component';
import {AdminRankListComponent} from './admin-rank-list/admin-rank-list.component';
import {AdminGoalListComponent} from './admin-goal-list/admin-goal-list.component';
import {AdminHistoryListComponent} from './admin-history-list/admin-history-list.component';
import {AdminTeamListComponent} from './admin-team-list/admin-team-list.component';
import {IsUserService} from './services/is-user.service';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    GameSwitchButtonComponent,
    SectionHistoryComponent,
    SectionGamesComponent,
    UserListComponent,
    UserUpdateComponent,
    NotFoundComponent,
    UserCreateComponent,
    LockUserComponent,
    NavbarComponent,
    SidebarComponent,
    ConfirmDeleteComponent,
    RestoreComponent,
    PlayerProfileCreateComponent,
    PlayerProfileListComponent,
    PlayerProfileEditComponent,
    TeamProfileListComponent,
    TeamProfileCreateComponent,
    TeamProfileEditComponent,
    PlayerPageComponent,
    TeamPageComponent,
    AdminPlayerListComponent,
    AdminUserListComponent,
    AdminGameListComponent,
    AdminRankListComponent,
    AdminGoalListComponent,
    AdminHistoryListComponent,
    AdminTeamListComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    GridModule,
    MatTableModule,
    CdkTreeModule,
    MatTreeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MyDatePickerModule,
    GlobalPlayersModule,
    GlobalTeamsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DropDownListModule,
    NumericTextBoxModule
  ],
  providers: [
    AccountService,
    UserprofileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CommunicationService,
    UserService,
    PlayerService,
    PlayerCommunicationServer,
    TeamService,
    TeamCommunicationService,
    PageService, ToolbarService,
    SortService,
    FilterService,
    GroupService,
    EditService, ToolbarService,
    IsUserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class AppModule {
}
