import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, PageSettingsModel, EditSettingsModel, ToolbarItems, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';
import { Rank } from '../interfaces/rank';
import { ChangeEventArgs, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { WtpResponse } from '../interfaces/wtp-response';

@Component({
  selector: 'app-admin-rank-list',
  templateUrl: './admin-rank-list.component.html',
  styleUrls: ['./admin-rank-list.component.scss']
})
export class AdminRankListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentRank:Rank;

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
  public rankNameRules: object;
  public rankIdRules: object;
  public rankvalueRules: object;
  public filterOption: FilterSettingsModel = { type: 'Excel' };

  ngOnInit(): void {
      //this.data = data;
      this.http.get<Rank[]>('http://localhost:5000/api/Rank/list').subscribe(result => {
        
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
      this.rankIdRules = { required: true, minLength: 1, number:true };
      this.rankNameRules = { required: true, minLength:3, maxLength:20,regex: '^[A-z 0-9]+$' };
      this.rankvalueRules={required:true,range:[1,100],number:true}
      
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
      var Rank = records[0] as Rank;
      console.log(records);
      this.http.post('http://localhost:5000/api/Rank/item',Rank).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Rankname or email are existed");
      });
      
    this.operationSate='';
    }
    else if(this.operationSate==='Edit')
    {
      var updatedRank = records[0] as Rank;
      console.log(records);
      this.http.put('http://localhost:5000/api/Rank/item/'+updatedRank.id,updatedRank).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Rankname or email are existed");
      }); 
    this.operationSate='';
    }
  }
  else if(this.operationSate==='Delete' && args.requestType==='delete')
  {
    console.log("Operation name: "+ this.operationSate);    
      this.http.delete('http://localhost:5000/api/Rank/item/'+this.currentRank.id)
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
   var z = this.Grid.getSelectedRecords() as Rank[];
   this.currentRank = z[0];
   console.log(this.currentRank);
}

}
