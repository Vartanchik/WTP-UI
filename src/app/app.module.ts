import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { CommunicationService } from './service/communication.service';
import { Comp3Component } from './comp3/comp3.component';

@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
