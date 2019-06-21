import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditSettingsModel, FilterSettingsModel, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {Game} from '../shared/game';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {ChangeEventArgs, ClickEventArgs} from '@syncfusion/ej2-navigations/src';
import {WtpResponse} from '../interfaces/wtp-response';
import {baseURIConfig} from '../services/dataconfig';

@Component({
  selector: 'app-admin-game-list',
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.scss']
})
export class AdminGameListComponent implements OnInit {

  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentGame: Game;
  @ViewChild('grid') public Grid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public gameNameRules: object;
  public gameIdRules: object;
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
    this.gameIdRules = {required: true, minLength: 1, number: true};
    this.gameNameRules = {required: true, minLength: 3, maxLength: 15, regex: '^[A-z 0-9]+$'};

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
        var game = args.data as Game;
        console.log(records);
        this.http.post(baseURIConfig + '/Game/item', game).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('gamename is existed');
            this.getData();
          });

        this.operationSate = '';
      } else if (this.operationSate === 'Edit') {
        var updatedgame = records[0] as Game;
        console.log(updatedgame);
        this.http.put(baseURIConfig + '/Game/item/' + updatedgame.id, updatedgame).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('gamename is existed');
            this.getData();
          });
        this.operationSate = '';
      }
      //this.getData();
    } else if (this.operationSate === 'Delete' && args.requestType === 'delete') {
      console.log('Operation name: ' + this.operationSate);
      this.http.delete(baseURIConfig + '/Game/item/' + this.currentGame.id)
        .subscribe((res: WtpResponse) => {
          console.log(res.message);
          window.alert(res.message);
        });
      this.operationSate = '';
    }
  }

  getData(): void {
    this.http.get<Game[]>(baseURIConfig + '/Game/list').subscribe(result => {

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
    var z = this.Grid.getSelectedRecords() as Game[];
    this.currentGame = z[0];
    console.log(this.currentGame);
  }

}
