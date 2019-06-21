import {IdItem} from 'src/app/interfaces/id-item';

export interface TeamFiltersModel {
  name: string;
  winRateLeftValue: number;
  winRateRightValue: number;
  membersLeftValue: number;
  membersRightValue: number;
  sortingField: string;
  sortingType: string;
  teamsOnPage: number;
  selectedItemGoals: IdItem[];
}
