import { Component, OnInit, ViewChild } from '@angular/core';
import { WtpResponse } from '../interfaces/wtp-response';
import { ClickEventArgs } from '@syncfusion/ej2-splitbuttons/src/split-button';
import { HttpClient } from '@angular/common/http';
import { PageSettingsModel, EditSettingsModel, ToolbarItems, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-navigations/src';

@Component({
  selector: 'app-admin-history-list',
  templateUrl: './admin-history-list.component.html',
  styleUrls: ['./admin-history-list.component.scss']
})
export class AdminHistoryListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentHistory:History;

  constructor(http:HttpClient){
    this.http = http;
  }

  @ViewChild('grid') public Grid: GridComponent;
  load() {
    const rowHeight: number = this.Grid.getRowHeight();  // height of the each row
    const gridHeight: any = this.Grid.height;  // grid height
    const pageSize: number = this.Grid.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.Grid.pageSettings.pageSize = 3;//pageSize + Math.round(pageResize);
    //this.Grid.pageSettings.pageCount = 6;
}

  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public filterOption: FilterSettingsModel = { type: 'Excel' };

  ngOnInit(): void {
      //this.data = data;
      this.http.get<History[]>('https://localhost:44390/api/Admin/history/list').subscribe(result => {
        
    if(result==null)
      window.alert("No content!");
    else{  
      this.data = result;
    }
    }, error => console.error(error));
      
      this.editSettings = {
        showConfirmDialog: true, showDeleteConfirmDialog: true,
        allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Dialog'
    };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      
      this.Grid.dataSourceChanged.subscribe(generatorOrNext=>{console.log(generatorOrNext)}, 
        error=>{console.log(error)},complete=>{console.log(complete)})
  }

  change(args: ChangeEventArgs) {
    console.log("page");
    //this.initialPage = { currentPage: args.value };
  }

}
