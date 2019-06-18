import { Player } from './interfaces/player';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './services/account.service';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { UserprofileService } from './services/userprofile.service';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommunicationService } from './services/communication.service';
import { GameSwitchButtonComponent } from './home/game-switch-button/game-switch-button.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from '../routes';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionGamesComponent } from './sections/section-games/section-games.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

import {UserService} from './services/user.service';
import { NotFoundComponent } from './users/not-found/not-found.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { LockUserComponent } from './users/lock-user/lock-user.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { ConfirmDeleteComponent } from './userprofile/confirm-delete/confirm-delete.component';
import { GlobalPlayersModule } from './global-players/global-players.module';
import { RestoreComponent } from './account/restore/restore.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PlayerProfileListComponent } from './player-profile-list/player-profile-list.component';
import { PlayerCommunicationServer } from './services/player.communication.service';
import { PlayerService } from './services/player.service';
import { PlayerProfileEditComponent } from './player-profile-edit/player-profile-edit.component';
import { TeamProfileListComponent } from './team-profile-list/team-profile-list.component';
import { TeamService } from './services/team.service';
import { TeamCommunicationService } from './services/team.communication.service';
import { TeamProfileCreateComponent } from './team-profile-create/team-profile-create.component';
import { TeamProfileEditComponent } from './team-profile-edit/team-profile-edit.component';

import { GridModule, PageService, ToolbarService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';
import { AdminFilterListComponent } from './admin-filter-list/admin-filter-list.component';
import { MatTableModule, MatTreeModule } from '@angular/material'
import { CdkTreeModule } from '@angular/cdk/tree';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AdminPlayerListComponent } from './admin-player-list/admin-player-list.component';
import { AdminTestListComponent } from './admin-test-list/admin-test-list.component';
import { AdminPagingListComponent } from './admin-paging-list/admin-paging-list.component';

import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { AdminRankListComponent } from './admin-rank-list/admin-rank-list.component';
import { AdminGoalListComponent } from './admin-goal-list/admin-goal-list.component';
import { AdminHistoryListComponent } from './admin-history-list/admin-history-list.component';
import { AdminTeamListComponent } from './admin-team-list/admin-team-list.component';
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
    AdminComponentComponent,
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
    PlayerProfileComponent,
    PlayerProfileListComponent,
    PlayerProfileEditComponent,
    TeamProfileListComponent,
    TeamProfileCreateComponent,
    TeamProfileEditComponent,
    AdminFilterListComponent,
    DropDownListComponent,
    AdminPlayerListComponent,
    AdminTestListComponent,
    AdminPagingListComponent,
    NumericTextBoxComponent,
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
    NgMultiSelectDropDownModule.forRoot()
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
    EditService, ToolbarService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class AppModule { }
