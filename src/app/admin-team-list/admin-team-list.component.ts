import {Component, OnInit, ViewChild} from '@angular/core';
import {Team} from '../interfaces/team';
import {ClickEventArgs} from '@syncfusion/ej2-navigations/src/toolbar';
import {WtpResponse} from '../interfaces/wtp-response';
import {ChangeEventArgs} from '@syncfusion/ej2-inputs';
import {EditSettingsModel, FilterSettingsModel, PageSettingsModel, ToolbarItems, IEditCell} from '@syncfusion/ej2-grids';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {HttpClient} from '@angular/common/http';
import {baseURIConfig} from '../services/dataconfig';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Game } from '../shared/game';
import { Goal } from '../interfaces/goal';
import { ShortTeam } from '../interfaces/teamShortDto';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.scss']
})
export class AdminTeamListComponent implements OnInit {

  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentTeam: Team;
  @ViewChild('grid') public Grid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public TeamNameRules: object;
  public TeamIdRules: object;
  public filterOption: FilterSettingsModel = {type: 'Excel'};
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public gameParams: IEditCell;
  public gameElem: HTMLElement;
  public gameObj: DropDownList;
  public gameNameRules: object;
  public game = [];


  public goalParams: IEditCell;
  public goalElem: HTMLElement;
  public goalObj: DropDownList;
  public goal = [];

  loadGame(): void {

    this.http.get<Game[]>(baseURIConfig + '/Game/list').subscribe((result: Game[]) => {
      console.log(result);
      if (result == null) {
        window.alert('No content!');
      } else {
        result.forEach(element => {
          this.game.push({key: element.id, value: element.name});
        });
        console.log(this.game);
      }
    }, error => console.error(error));

    this.gameParams = {
      create: () => {
        this.gameElem = document.createElement('input');
        return this.gameElem;
      },
      read: () => {
        return this.gameObj.text;
      },
      destroy: () => {
        this.gameObj.destroy();
      },
      write: () => {
        this.gameObj = new DropDownList({
          dataSource: this.game,
          fields: {value: 'key', text: 'value'},
          //     change: () => {
          //     this.rankObj.enabled = true;
          //     let tempQuery: Query = new Query().where('gameId', 'equal', this.gameObj.value);
          //     this.rankObj.query = tempQuery;
          //     this.rankObj.text = null;
          //     this.rankObj.dataBind();
          // },
          placeholder: 'Select a game',
          floatLabelType: 'Never'
        });
        this.gameObj.appendTo(this.gameElem);
      }
    };
  }


  loadGoal(): void {
    this.http.get<Goal[]>(baseURIConfig + '/Goal/list').subscribe((result: Goal[]) => {
      console.log(result);
      if (result == null) {
        window.alert('No content!');
      } else {
        result.forEach(element => {
          this.goal.push({key: element.id, value: element.name});
        });
        console.log(this.goal);
      }
    }, error => console.error(error));

    this.goalParams = {
      create: () => {
        this.goalElem = document.createElement('input');
        return this.goalElem;
      },
      read: () => {
        return this.goalObj.text;
      },
      destroy: () => {
        this.goalObj.destroy();
      },
      write: () => {
        this.goalObj = new DropDownList({
          dataSource: this.goal,
          fields: {value: 'key', text: 'value'},
          placeholder: 'Select a goal',
          floatLabelType: 'Never'
        });
        this.goalObj.appendTo(this.goalElem);
      }
    };
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
    this.loadGame();
    this.loadGoal();
    this.getData();

    this.editSettings = {
      showConfirmDialog: true, showDeleteConfirmDialog: true,
      allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.TeamIdRules = {required: true, minLength: 1, number: true};
    this.TeamNameRules = {required: true, minLength: 3, maxLength: 20, regex: '^[A-z 0-9]+$'};

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
        var team = args.data as ShortTeam;
        team.goalId = this.goalObj.value as number;
        team.gameId = this.gameObj.value as number;
        team.serverId=1;
        console.log(records);
        this.http.post(baseURIConfig + '/Team/create', team).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Team is existed');
            this.getData();
          });

        this.operationSate = '';
      } else if (this.operationSate === 'Edit') {
        var updatedTeam = records[0] as ShortTeam;
        updatedTeam.goalId = this.goalObj.value as number;
        updatedTeam.gameId = this.gameObj.value as number;
        updatedTeam.serverId=1;
        console.log(records);
        this.http.put(baseURIConfig + '/Team/update', updatedTeam).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Team is existed');
            this.getData();
          });
        this.operationSate = '';
      }
    } else if (this.operationSate === 'Delete' && args.requestType === 'delete') {
      console.log('Operation name: ' + this.operationSate);
      this.http.delete(baseURIConfig + '/Team/delete' + this.currentTeam.id)
        .subscribe((res: WtpResponse) => {
          console.log(res.message);
          window.alert(res.message);
        });
      this.operationSate = '';
    }
  }


  toolbarClick(args: ClickEventArgs) {
    this.operationSate = args.item.text;
    console.log(args.item.text + '!');
    var z = this.Grid.getSelectedRecords() as Team[];
    this.currentTeam = z[0];
    console.log(this.currentTeam);
  }

  getData(): void {
    this.http.get<Team[]>(baseURIConfig + '/Team/team/list').subscribe(result => {

      if (result == null) {
        window.alert('No content!');
      } else {
        this.data = result;
      }
    }, error => console.error(error));
  }

}
