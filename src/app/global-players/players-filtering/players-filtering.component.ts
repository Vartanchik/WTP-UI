import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { dropdownListRanksConfig } from 'src/app/services/dataconfig';
import { PlayerFiltersModel } from '../models/PlayerFilters';

@Component({
  selector: 'app-players-filtering',
  templateUrl: './players-filtering.component.html',
  styleUrls: ['./players-filtering.component.scss']
})

export class PlayersFilteringComponent implements OnInit {
  
  filterFields: PlayerFiltersModel = {
    name: '',
    rankLeft: 0,
    rankRight: 7,
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
    ceil: 7,
    step: 1,
    translate: (value: number): string => {
      switch(value){
        case 0:
          return dropdownListRanksConfig[0].name
        case 1:
          return dropdownListRanksConfig[1].name
        case 2:
          return dropdownListRanksConfig[2].name
        case 3:
          return dropdownListRanksConfig[3].name
        case 4:
          return dropdownListRanksConfig[4].name
        case 5:
          return dropdownListRanksConfig[5].name
        case 6:
          return dropdownListRanksConfig[6].name
        case 7:
          return dropdownListRanksConfig[7].name
        default:
          return 'None'
      }

    }
  };

  constructor() { }

  FindPlayers(){
  }

  SortChanged(){
    if(this.filterFields.sortingField != '0' && this.filterFields.sortingField != '')
    this.sortEnabled = false;
  }

  ngOnInit() {  }

}
