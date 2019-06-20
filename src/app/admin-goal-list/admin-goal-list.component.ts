import {Component, OnInit, ViewChild} from '@angular/core';
import {ClickEventArgs} from '@syncfusion/ej2-navigations/src/toolbar';
import {WtpResponse} from '../interfaces/wtp-response';
import {HttpClient} from '@angular/common/http';
import {EditSettingsModel, FilterSettingsModel, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {Goal} from '../interfaces/goal';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {ChangeEventArgs} from '@syncfusion/ej2-inputs/src';
import {baseURIConfig} from '../services/dataconfig';

@Component({
  selector: 'app-admin-goal-list',
  templateUrl: './admin-goal-list.component.html',
  styleUrls: ['./admin-goal-list.component.scss']
})
export class AdminGoalListComponent implements OnInit {

  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentGoal: Goal;
  @ViewChild('grid') public Grid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public goalNameRules: object;
  public goalIdRules: object;
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
      allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.goalIdRules = {required: true, minLength: 1, number: true};
    this.goalNameRules = {required: true, minLength: 3, maxLength: 20, regex: '^[A-z 0-9]+$'};

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

  actionComplete(args) {
    console.log(args.requestType);
    if (args.requestType === 'save') {
      var records = this.Grid.getSelectedRecords();

      console.log('Operation name: ' + this.operationSate);
      if (this.operationSate === 'Add') {
        var Goal = args.data as Goal;
        console.log(records);
        this.http.post(baseURIConfig + '/Goal', Goal).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Goalname is existed');
            this.getData();
          });

        this.operationSate = '';
      } else if (this.operationSate === 'Edit') {
        var updatedGoal = records[0] as Goal;
        console.log(records);
        this.http.put(baseURIConfig + '/Goal/item/' + updatedGoal.id, updatedGoal).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Goalname is existed');
            this.getData();
          });
        this.operationSate = '';
      }
      //this.getData();
    } else if (this.operationSate === 'Delete' && args.requestType === 'delete') {
      console.log('Operation name: ' + this.operationSate);
      this.http.delete(baseURIConfig + '/Goal/item/' + this.currentGoal.id)
        .subscribe((res: WtpResponse) => {
          console.log(res.message);
          window.alert(res.message);
        });
      this.operationSate = '';
    }
  }


  getData(): void {
    this.http.get<Goal[]>(baseURIConfig + '/Goal/list').subscribe(result => {

      if (result == null) {
        window.alert('No content!');
      } else {
        this.data = result;
      }
    }, error => console.error(error));
  }


  toolbarClick(args: ClickEventArgs) {
    this.operationSate = args.item.text;
    console.log(args.item.text + '!');
    var z = this.Grid.getSelectedRecords() as Goal[];
    this.currentGoal = z[0];
    console.log(this.currentGoal);
  }

}
