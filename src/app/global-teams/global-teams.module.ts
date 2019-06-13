import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotaTeamsComponent } from './dota/dota.component';
import { CsGoTeamsComponent } from './cs-go/cs-go.component';
import { GtaTeamsComponent } from './gta/gta.component';
import { TeamsFilteringComponent } from './teams-filtering/teams-filtering.component';

@NgModule({
  declarations: [DotaTeamsComponent, CsGoTeamsComponent, GtaTeamsComponent, TeamsFilteringComponent],
  imports: [
    CommonModule
  ]
})
export class GlobalTeamsModule { }
