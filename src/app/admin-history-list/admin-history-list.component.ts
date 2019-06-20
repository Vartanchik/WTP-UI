import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditSettingsModel, FilterSettingsModel, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {ChangeEventArgs} from '@syncfusion/ej2-navigations/src';
import {baseURIConfig} from '../services/dataconfig';

@Component({
  selector: 'app-admin-history-list',
  templateUrl: './admin-history-list.component.html',
  styleUrls: ['./admin-history-list.component.scss']
})
export class AdminHistoryListComponent implements OnInit {

  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentHistory: History;
  @ViewChild('grid') public Grid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public filterOption: FilterSettingsModel = {type: 'Excel'};
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  load() {
    const rowHeight: number = this.Grid.getRowHeight();  // height of the each row
    const gridHeight: any = this.Grid.height;  // grid height
    const pageSize: number = this.Grid.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.Grid.pageSettings.pageSize = 3;//pageSize + Math.round(pageResize);
    //this.Grid.pageSettings.pageCount = 6;
  }

  ngOnInit(): void {
    //this.data = data;
    this.getData();

    this.editSettings = {
      showConfirmDialog: true, showDeleteConfirmDialog: true,
      allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Dialog'
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    this.Grid.dataSourceChanged.subscribe(generatorOrNext => {
        console.log(generatorOrNext);
      },
      error => {
        console.log(error);
      }, complete => {
        console.log(complete);
      });
  }

  change(args: ChangeEventArgs) {
    console.log('page');
    //this.initialPage = { currentPage: args.value };
  }

  getData(): void {
    this.http.get<History[]>(baseURIConfig + '/Admin/history/list').subscribe(result => {

      if (result == null) {
        window.alert('No content!');
      } else {
        this.data = result;
      }
    }, error => console.error(error));
  }
}
