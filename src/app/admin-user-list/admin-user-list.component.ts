import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditSettingsModel, FilterSettingsModel, PageSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {User} from '../interfaces/user';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {ChangeEventArgs} from '@syncfusion/ej2-navigations/src/sidebar';
import {ClickEventArgs} from '@syncfusion/ej2-navigations';
import {RegisterModel} from '../interfaces/registerModel';
import {WtpResponse} from '../interfaces/wtp-response';
import {baseURIConfig} from '../services/dataconfig';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentUser: User;
  @ViewChild('grid') public Grid: GridComponent;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public userNameRules: object;
  public userIDRules: object;
  public userEmailRules: object;
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
    this.userIDRules = {required: true, minLength: 1, number: true};
    this.userNameRules = {required: true, minLength: 6, maxLength: 15, regex: '^[A-z 0-9]+$'};
    this.userEmailRules = {required: true, email: true};
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
      console.log(args);
      var records = this.Grid.getSelectedRecords();
      console.log('Operation name: ' + this.operationSate);
      if (this.operationSate === 'Add') {
        //console.log(args.data);
        var newUser = args.data as RegisterModel;
        newUser.password = '123456';
        this.http.post(baseURIConfig + '/Admin/users/profiles', newUser).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Username or email are existed');
            this.getData();
          });
        this.operationSate = '';
      } else if (this.operationSate === 'Edit') {
        var updatedUser = records[0] as User;
        updatedUser.dateOfBirth = '';
        console.log(records);
        this.http.put(baseURIConfig + '/Admin/users/' + updatedUser.id, updatedUser).subscribe(
          (res: WtpResponse) => {
            console.log(res.message);
            window.alert(res.message);
            this.getData();
          },
          (err: WtpResponse) => {
            console.log('Error');
            window.alert('Username or email are existed');
            this.getData();
          });
        this.operationSate = '';
      }
      //this.getData();
    } else if (this.operationSate === 'Delete' && args.requestType === 'delete') {
      console.log('Operation name: ' + this.operationSate);
      this.http.delete(baseURIConfig + '/Admin/users/' + this.currentUser.id)
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
    var z = this.Grid.getSelectedRecords() as User[];
    this.currentUser = z[0];
    console.log(this.currentUser);
  }

  getData() {
    baseURIConfig;
    this.http.get<User[]>(baseURIConfig + '/Admin/users').subscribe(result => {

      if (result == null) {
        window.alert('No content!');
      } else {
        this.data = result;
      }
    }, error => console.error(error));
  }
}
