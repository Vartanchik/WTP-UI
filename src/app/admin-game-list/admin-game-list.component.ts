import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageSettingsModel, EditSettingsModel, ToolbarItems, FilterSettingsModel } from '@syncfusion/ej2-grids';
import { Game } from '../shared/game';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, ClickEventArgs } from '@syncfusion/ej2-navigations/src';
import { WtpResponse } from '../interfaces/wtp-response';

@Component({
  selector: 'app-admin-game-list',
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.scss']
})
export class AdminGameListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentGame:Game;

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
  public gameNameRules: object;
  public gameIdRules: object;
  public filterOption: FilterSettingsModel = { type: 'Excel' };

  ngOnInit(): void {
      //this.data = data;
      this.http.get<Game[]>('http://localhost:5000/api/Game/list').subscribe(result => {
        
    if(result==null)
      window.alert("No content!");
    else{  
      this.data = result;
    }
    }, error => console.error(error));
      
      this.editSettings = {
        showConfirmDialog: true, showDeleteConfirmDialog: true,
        allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'
    };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.gameIdRules = { required: true, minLength: 1, number:true };
      this.gameNameRules = { required: true, minLength:3, maxLength:15,regex: '^[A-z 0-9]+$' };
      
      this.Grid.dataSourceChanged.subscribe(generatorOrNext=>{console.log(generatorOrNext)}, 
        error=>{console.log(error)},complete=>{console.log(complete)})
  }

  change(args: ChangeEventArgs) {
    console.log("page");
    //this.initialPage = { currentPage: args.value };
  }

actionComplete(args) {
  console.log(args.requestType);
  if(args.requestType==='save')
  {
    var records = this.Grid.getSelectedRecords();

    console.log("Operation name: "+ this.operationSate);
    if(this.operationSate==='Add')
    {
      var game = records[0] as Game;
      console.log(records);
      this.http.post('http://localhost:5000/api/Game/item',game).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("gamename is existed");
      });
      
    this.operationSate='';
    }
    else if(this.operationSate==='Edit')
    {
      var updatedgame = records[0] as Game;
      console.log(updatedgame);
      this.http.put('http://localhost:5000/api/Game/item/'+updatedgame.id,updatedgame).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("gamename is existed");
      }); 
    this.operationSate='';
    }
  }
  else if(this.operationSate==='Delete' && args.requestType==='delete')
  {
    console.log("Operation name: "+ this.operationSate);    
      this.http.delete('http://localhost:5000/api/Game/item/'+this.currentGame.id)
      .subscribe((res:WtpResponse)=>{
        console.log(res.message); 
        window.alert(res.message)});
    this.operationSate='';
  }
}


toolbarClick(args:ClickEventArgs)
{
   this.operationSate = args.item.text;
   console.log(args.item.text+"!");
   var z = this.Grid.getSelectedRecords() as Game[];
   this.currentGame = z[0];
   console.log(this.currentGame);
}

}
