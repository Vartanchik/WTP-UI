import { Component, OnInit, ViewChild } from '@angular/core';
import { Team } from '../interfaces/team';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { WtpResponse } from '../interfaces/wtp-response';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { FilterSettingsModel, ToolbarItems, EditSettingsModel, PageSettingsModel } from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.scss']
})
export class AdminTeamListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentTeam:Team;

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
  public TeamNameRules: object;
  public TeamIdRules: object;
  public filterOption: FilterSettingsModel = { type: 'Excel' };

  ngOnInit(): void {
      //this.data = data;
      this.http.get<Team[]>('http://localhost:5000/api/Team/team/list').subscribe(result => {
        
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
      this.TeamIdRules = { required: true, minLength: 1, number:true };
      this.TeamNameRules = { required: true, minLength:3, maxLength:20,regex: '^[A-z 0-9]+$' };
      
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
      var Team = records[0] as Team;
      console.log(records);
      this.http.post('http://localhost:5000/api/Team/create',Team).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Team is existed");
      });
      
    this.operationSate='';
    }
    else if(this.operationSate==='Edit')
    {
      var updatedTeam = records[0] as Team;
      console.log(records);
      this.http.put('http://localhost:5000/api/Team/update',updatedTeam).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Team is existed");
      }); 
    this.operationSate='';
    }
  }
  else if(this.operationSate==='Delete' && args.requestType==='delete')
  {
    console.log("Operation name: "+ this.operationSate);    
      this.http.delete('http://localhost:5000/api/Team/delete'+this.currentTeam.id)
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
   var z = this.Grid.getSelectedRecords() as Team[];
   this.currentTeam = z[0];
   console.log(this.currentTeam);
}

}
