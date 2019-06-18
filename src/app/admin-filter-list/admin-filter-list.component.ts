import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { orderDataSource } from './data';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-admin-filter-list',
  templateUrl: './admin-filter-list.component.html',
  styleUrls: ['./admin-filter-list.component.scss']
})
export class AdminFilterListComponent implements OnInit {

  public data: Object[];
  public ddldata: Object[];
  public pageSettings: Object;
  public filterSettings: Object;
  public filteringType: Object[] = [
      { Id: 'Menu', type: 'Menu' },
      { Id: 'CheckBox', type: 'Checkbox' },
      { Id: 'Excel', type: 'Excel' }
  ];
  public ddlfields: Object = { text: 'type', value: 'Id' };
  public formatoptions: Object;

  @ViewChild('grid')
  public grid: GridComponent;

  ngOnInit(): void {
      this.data = orderDataSource;
      this.pageSettings = { pageCount: 5 };
      this.filterSettings = { type: 'Menu' };
      this.ddldata = this.filteringType;
      this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }
  }
  public onChange(e: ChangeEventArgs): void {
      this.grid.filterSettings.type = <FilterType>e.value;
      this.grid.clearFiltering();
  }

}
