import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeamFiltersModel } from '../models/team-filters';
import { DotaTeamsComponent } from '../dota/dota.component';
import { GlobalTeamsService } from '../global-teams.service';
import { Options } from 'ng5-slider';
import { IdItem } from 'src/app/interfaces/id-item';
import { dropdownListGoalsConfig, dropdownSettingsGoalsConfig } from 'src/app/services/dataconfig';


@Component({
  selector: 'app-teams-filtering',
  templateUrl: './teams-filtering.component.html',
  styleUrls: ['./teams-filtering.component.scss']
})
export class TeamsFilteringComponent implements OnInit {


  filterFields: TeamFiltersModel = {
    name: '',
    winRateLeftValue: 0,
    winRateRightValue: 100,
    membersLeftValue: 0,
    membersRightValue: 5,
    sortingField: '',
    sortingType: '',
    teamsOnPage: 5,
    selectedItemGoals: []
  }

  sortEnabled: boolean = true;

  optionsMembersQuantity: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
  };


  constructor(
    private svc: GlobalTeamsService
  ) { }

  //@Output() onFilter: EventEmitter = new EventEmitter();

    //  clickFilter():void {
    //      // this.onFilter.emit('Register click');
    //      this.svc.filter('Filter click');
    //  }

  SortChanged(){
    if(this.filterFields.sortingField != '0' && this.filterFields.sortingField != '')
    this.sortEnabled = false;
  }

  updateSortFields(){
    this.svc.pushUpdatedValues(this.filterFields);
    this.svc.filter('Filter click');
    //this.dota.loadList();
  }
  
  dropdownListGoals = [];
  selectedItemGoals: IdItem[] = null;
  dropdownSettingsGoals = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 0,
    selectAllText: "Selected All",
    allowSearchFilter: false};

  ngOnInit() {  
    this.dropdownListGoals = dropdownListGoalsConfig;      
  }
}
