import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotaComponent } from './dota/dota.component';
import { DotaPlayerComponent } from './dota/dota-player/dota-player.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayersFilteringComponent } from './players-filtering/players-filtering.component';
import { GtaComponent } from './gta/gta.component';
import { CsGoComponent } from './cs-go/cs-go.component';
import { CsPlayerComponent } from './cs-go/cs-player/cs-player.component';
import { GtaPlayerComponent } from './gta/gta-player/gta-player.component';


@NgModule({
  declarations: [
    DotaComponent,
    GtaComponent,
    CsGoComponent,
    DotaPlayerComponent,
    PlayersFilteringComponent,
    CsPlayerComponent,
    GtaPlayerComponent,
  ],
  imports: [
    CommonModule,
    Ng5SliderModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ]
})
export class GlobalPlayersModule { }
