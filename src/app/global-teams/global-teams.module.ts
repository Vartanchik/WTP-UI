import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotaTeamsComponent } from './dota/dota.component';
import { CsGoTeamsComponent } from './cs-go/cs-go.component';
import { GtaTeamsComponent } from './gta/gta.component';
import { TeamsFilteringComponent } from './teams-filtering/teams-filtering.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DotaTeamComponent } from './dota/dota-team/dota-team.component';
import { AvatarModule } from 'ngx-avatar';
import { TeamPlayerComponent } from './dota/dota-team/team-player/team-player.component';
import { MatRadioModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CsTeamComponent } from './cs-go/cs-team/cs-team.component';
import { GtaTeamComponent } from './gta/gta-team/gta-team.component';


@NgModule({
  declarations: [
    DotaTeamsComponent, 
    CsGoTeamsComponent, 
    GtaTeamsComponent, 
    TeamsFilteringComponent, DotaTeamComponent, TeamPlayerComponent, CsTeamComponent, GtaTeamComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Ng5SliderModule,
    NgbModule,
    FormsModule,
    AvatarModule,
    MatRadioModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class GlobalTeamsModule { }
