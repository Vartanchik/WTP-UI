import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from '../routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionUsersComponent } from './sections/section-users/section-users.component';
import { SectionNewProfileComponent } from './sections/section-new-profile/section-new-profile.component';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionGamesComponent } from './sections/section-games/section-games.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionUsersComponent,
    SectionNewProfileComponent,
    SectionHistoryComponent,
    SectionGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
