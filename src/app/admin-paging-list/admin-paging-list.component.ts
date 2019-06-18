import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from './data';
import { GridComponent, PageEventArgs, PageSettingsModel, SortEventArgs, FilterSettingsModel, FilterEventArgs, SortService, EditSettingsModel, ToolbarItems, SaveEventArgs, DialogEditEventArgs, EditEventArgs, CellSaveArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DataUtil } from '@syncfusion/ej2-data';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserIndexViewModel } from '../interfaces/userIndexViewModel';
import { User } from '../interfaces/userDataForAdmin';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { DataSourceChangedEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { Register } from '../interfaces/register';
import { RegisterModel } from '../interfaces/registerModel';
import { WtpResponse } from '../interfaces/wtp-response';
import { UpdateModel } from '../interfaces/updateModel';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-paging-list',
  templateUrl: './admin-paging-list.component.html',
  styleUrls: ['./admin-paging-list.component.scss']
})
export class AdminPagingListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentUser:User;

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
    public userNameRules: object;
    public userIDRules: object;
    public userEmailRules: object;

  ngOnInit(): void {
      //this.data = data;
      this.http.get<User[]>('https://localhost:44390/api/Admin/users').subscribe(result => {
        
    if(result==null)
      window.alert("No content!");
    else{  
      this.data = result;
    }
    }, error => console.error(error));
      //this.initialPage = { pageSize: 1 ,pageCount:7};
      //console.log(this.data);
      this.data = data;
      //this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
      this.editSettings = {
        showConfirmDialog: true, showDeleteConfirmDialog: true,
        allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'
    };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.userIDRules = { required: true, minLength: 1, number:true };
      this.userNameRules = { required: true, minLength:6, maxLength:15,regex: '^[A-z 0-9]+$' };
      this.userEmailRules = {required:true, email:true};
      this.Grid.dataSourceChanged.subscribe(generatorOrNext=>{console.log(generatorOrNext)}, 
        error=>{console.log(error)},complete=>{console.log(complete)})
  }

  change(args: ChangeEventArgs) {
    console.log("page");
    //this.initialPage = { currentPage: args.value };
  }


  columnMenuClick(args: MenuEventArgs): void {
    console.log('123');
      if(args.item.id === 'gridclearsorting'){
            //this.grid.clearSorting();
        }
    }

  beforeBatchSave(args: SaveEventArgs) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        console.log("lol");
    }
    if (args.requestType === 'save') {
      console.log(args.requestType);
    }
}

actionComplete(args) {
  console.log(args.requestType);
  if(args.requestType==='save')
  {
    var records = this.Grid.getSelectedRecords();

    console.log("Operation name: "+ this.operationSate);
    if(this.operationSate==='Add')
    {
      var user = records[0] as RegisterModel;
      user.password = '123456';
      console.log(records);
      this.http.post('https://localhost:44390/api/Admin/users/profiles',user).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Username or email are existed");
      });

    this.operationSate='';
    }
    else if(this.operationSate==='Edit')
    {
      var updatedUser = records[0] as User;
      updatedUser.dateOfBirth = '';
      console.log(records);
      this.http.put('https://localhost:44390/api/Admin/users/'+updatedUser.id,updatedUser).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Username or email are existed");
      }); 
    this.operationSate='';
    }
  }
  else if(this.operationSate==='Delete' && args.requestType==='delete')
  {
    console.log("Operation name: "+ this.operationSate);
    // var t = this.Grid.getSelectedRecords() as User[];
    // var deletedUser = t[0];
    // console.log(deletedUser);      
      this.http.delete('https://localhost:44390/api/Admin/users/'+this.currentUser.id)
      .subscribe((res:WtpResponse)=>{
        console.log(res.message); 
        window.alert(res.message)});
    this.operationSate='';
  }
  // if(this.operationSate!=null && args.requestType==='batchsave')
  //   console.log(args.requestType);
  // //if(args.requestType==='batchsave' && args.requestType)
  //   if (args.requestType === 'beginEdit' || args.requestType === 'beginAdd') {
  //     console.log(args.requestType);
  //   }
}


//   sortActionHandler(args: SortEventArgs) {
//     console.log("sort");
//   }
//   actionHandler(args: FilterEventArgs) {
//     console.log("filter");
//     //console.log(args.currentFilterObject.actualFilterValue.toString());
//     //console.log(args.currentFilteringColumn);
//     //alert(args.requestType + ' ' + args.columnName); // custom Action
// }

public filterOption: FilterSettingsModel = { type: 'Excel' };
// public dropdata: string[] = DataUtil.distinct(data, 'CustomerID') as string[];
// public fields: object = { text: 'CustomerID', value: 'CustomerID' };
// public height = '220px';

//Current page
public pageNumber: number = 1;

//Count of pages
public count: number;

toolbarClick(args:ClickEventArgs)
{
   this.operationSate = args.item.text;
   console.log(args.item.text+"!");
   var z = this.Grid.getSelectedRecords() as User[];
   this.currentUser = z[0];
   console.log(this.currentUser);
  // var t = this.Grid.getSelectedRowIndexes();
  // var records = this.Grid.getSelectedRecords();
  // console.log(records);
  

  //console.log(this.Grid.dataSource);
  // if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //   console.log(args.requestType);
  // }
}

// columnMenuClick(args){
//   console.log("Menu work");
//   if(args.item.id === 'gridclearsorting'){
      
//   }
// }
//Count of users at one page
public itemOnPage:number;
//Load dat from server
dataBound() {
  console.log("Hi");
  // console.log(this.Grid.isEdit);
  // console.log(this.Grid.cellEdit.subscribe(result => {
        
  //     console.log(result);
  //     }, error => console.error(error)));
  // this.http.get<UserIndexViewModel>('https://localhost:44390/api/Admin/list?name='+'user'+'&page='+this.pageNumber).subscribe(result => {
        
  //   if(result==null)
  //     window.alert("No content!");
  //   else{      
  //     this.data = result.users;
  //     this.pageNumber = result.pageViewModel.pageNumber;
  //     this.count = result.pageViewModel.totalPages*result.users.length;
  //     this.itemOnPage= result.users.length;
  //   }
  //   }, error => console.error(error));
}

// dataStateChange(state: DataStateChangeEventArgs)
// {
  
// }

}
