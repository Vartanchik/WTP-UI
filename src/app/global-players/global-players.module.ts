import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DotaComponent } from './dota/dota.component';
import { CsGoComponent } from './cs-go/cs-go.component';
import { GtaComponent } from './gta/gta.component';
import { DotaPlayerComponent } from './dota/dota-player/dota-player.component';


import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { PlayersFilteringComponent } from './players-filtering/players-filtering.component';


@NgModule({
  declarations: [
    DotaComponent,
    CsGoComponent,
    GtaComponent,
    DotaPlayerComponent,
    PlayersFilteringComponent,
  ],
  imports: [
    CommonModule,
    Ng5SliderModule,
    NgbModule,
    FormsModule,
  ]
})
export class GlobalPlayersModule { }
