import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from '../routes';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionGamesComponent } from './sections/section-games/section-games.component';
import {NgbModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

import {UserService} from './services/user.service';
import { NotFoundComponent } from './users/not-found/not-found.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { LockUserComponent } from './users/lock-user/lock-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionHistoryComponent,
    SectionGamesComponent,
    UserListComponent,
    UserUpdateComponent,
    NotFoundComponent,
    UserCreateComponent,
    LockUserComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
