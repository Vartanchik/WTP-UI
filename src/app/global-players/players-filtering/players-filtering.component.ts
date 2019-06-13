import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { dropdownListRanksConfig } from 'src/app/services/dataconfig';
import { PlayerFiltersModel } from '../models/PlayerFilters';
import { GlobalPlayersService } from '../global-players.service';
import { DotaComponent } from '../dota/dota.component';



@Component({
  selector: 'app-players-filtering',
  templateUrl: './players-filtering.component.html',
  styleUrls: ['./players-filtering.component.scss']
})

export class PlayersFilteringComponent implements OnInit {
  
  filterFields: PlayerFiltersModel = {
    name: '',
    rankLeft: 0,
    rankRight: 100,
    decencyLeft: 0,
    decencyRight: 10000,
    sortingField: '',
    sortingType: ''
  }

  sortEnabled: boolean = true;

  optionsDecency: Options = {
    floor: 0,
    ceil: 10000,
    step: 100,
  };

  optionsRank: Options = {
    floor: 0,
    ceil: 70,
    step: 10,
    translate: (value: number): string => {
      switch(value){
        case 0:
          return dropdownListRanksConfig[0].name
        case 10:
          return dropdownListRanksConfig[1].name
        case 20:
          return dropdownListRanksConfig[2].name
        case 30:
          return dropdownListRanksConfig[3].name
        case 40:
          return dropdownListRanksConfig[4].name
        case 50:
          return dropdownListRanksConfig[5].name
        case 60:
          return dropdownListRanksConfig[6].name
        case 70:
          return dropdownListRanksConfig[7].name
        default:
          return 'None'
      }

    }
  };

  constructor(private svc: GlobalPlayersService, private dota: DotaComponent) { }

  SortChanged(){
    if(this.filterFields.sortingField != '0' && this.filterFields.sortingField != '')
    this.sortEnabled = false;
  }

  updateSortFields(){
    this.svc.pushUpdatedValues(this.filterFields);
    this.dota.loadList();
  }
  ngOnInit() {  }

}
