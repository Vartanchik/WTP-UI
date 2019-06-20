import { Component, OnInit, ViewChild } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';

import { Grid, Filter,Page,Sort, SortEventArgs, PageSettingsModel, EditSettingsModel, ToolbarItems, FilterSettingsModel, IEditCell } from '@syncfusion/ej2-grids';
import { data } from './data';
import { NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { HttpClient } from '@angular/common/http';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { WtpResponse } from '../interfaces/wtp-response';
import { User } from '../interfaces/user';
import { RegisterModel } from '../interfaces/registerModel';
import { PlayerInfo } from '../interfaces/playerInfo';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Game } from '../shared/game';
import { Rank } from '../interfaces/rank';
import { Goal } from '../interfaces/goal';
import { Team } from '../interfaces/team';
import { baseURIConfig } from '../services/dataconfig';



@Component({
  selector: 'app-admin-player-list',
  templateUrl: './admin-player-list.component.html',
  styleUrls: ['./admin-player-list.component.scss']
})
export class AdminPlayerListComponent implements OnInit {

  private http: HttpClient;
  public data: object[];
  public initialPage: PageSettingsModel;
  public operationSate: string;
  public currentPlayer:PlayerInfo;

  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public filterOption: FilterSettingsModel = { type: 'Excel' };

  constructor(http:HttpClient){
    this.http = http;
  }

  @ViewChild('grid') public Grid: GridComponent;


  public gameParams : IEditCell;
  public rankParams : IEditCell;
  public goalParams : IEditCell;
  public teamParams : IEditCell;
  public userParams : IEditCell;

  public gameElem : HTMLElement;
  public gameObj : DropDownList;

  public rankElem : HTMLElement;
  public rankObj : DropDownList;

  public goalElem:HTMLElement;
  public goalObj:DropDownList;

  public teamElem:HTMLElement;
  public teamObj:DropDownList;

  public userElem:HTMLElement;
  public userObj:DropDownList;

  public game=[];
  public rank=[]; 
  public goal=[];
  public team=[];
  public user=[];


  public gameNameRules: object;
  public rankNameRules: object;
  public goalNameRules: object;
  public teamNameRules: object;
  public playerNameRules:object;
  public playerIdRules:object;
  public decencyRules:object;

loadGame():void{

  this.http.get<Game[]>(baseURIConfig+'/Game/list').subscribe((result:Game[]) => {
        console.log(result);
    if(result==null)
      window.alert("No content!");
    else{  
      result.forEach(element => {
        this.game.push({key:element.id,value:element.name});
      });
      console.log(this.game);
    }
    }, error => console.error(error));

  this.gameParams = {
    create:()=>{
    this.gameElem = document.createElement('input');
        return this.gameElem;
    },
    read:()=>{
        return this.gameObj.text;
    },
    destroy:()=>{
        this.gameObj.destroy();
    },
    write:()=>{
        this.gameObj = new DropDownList({
        dataSource: this.game,
        fields: { value: 'key', text: 'value' },
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
}};

// this.rankParams = {
//   create:()=>{
//       this.rankElem = document.createElement('input');
//       return this.rankElem;
//   },
//   read:()=>{
//       return this.rankObj.text;
//   },
//   destroy:()=>{
//       this.rankObj.destroy();
//   },
//   write:()=>{
//       this.rankObj = new DropDownList({
//       dataSource: this.rank,
//       fields: { value: 'rankId', text: 'rankName' },
//       enabled: false,
//       placeholder: 'Select a rank',
//       floatLabelType: 'Never'
//   });
//   this.rankObj.appendTo(this.rankElem);
// }}
}



loadRank():void{
  this.http.get<Rank[]>(baseURIConfig+'/Rank/list').subscribe((result:Rank[]) => {
    console.log(result);
if(result==null)
  window.alert("No content!");
else{  
  result.forEach(element => {
    this.rank.push({key:element.id,value:element.name});
  });
  console.log(this.rank);
}
}, error => console.error(error));

this.rankParams = {
create:()=>{
this.rankElem = document.createElement('input');
    return this.rankElem;
},
read:()=>{
    return this.rankObj.text;
},
destroy:()=>{
    this.rankObj.destroy();
},
write:()=>{
    this.rankObj = new DropDownList({
    dataSource: this.rank,
    fields: { value: 'key', text: 'value' },
placeholder: 'Select a rank',
floatLabelType: 'Never'
});
this.rankObj.appendTo(this.rankElem);
}};

}

loadGoal():void{
  this.http.get<Goal[]>(baseURIConfig+'/Goal/list').subscribe((result:Goal[]) => {
    console.log(result);
if(result==null)
  window.alert("No content!");
else{  
  result.forEach(element => {
    this.goal.push({key:element.id,value:element.name});
  });
  console.log(this.goal);
}
}, error => console.error(error));

this.goalParams = {
create:()=>{
this.goalElem = document.createElement('input');
    return this.goalElem;
},
read:()=>{
    return this.goalObj.text;
},
destroy:()=>{
    this.goalObj.destroy();
},
write:()=>{
    this.goalObj = new DropDownList({
    dataSource: this.goal,
    fields: { value: 'key', text: 'value' },
placeholder: 'Select a goal',
floatLabelType: 'Never'
});
this.goalObj.appendTo(this.goalElem);
}};
}


loadTeam():void{
  this.http.get<Team[]>(baseURIConfig+'/Team/team/list').subscribe((result:Team[]) => {
    console.log(result);
if(result==null)
  window.alert("No content!");
else{  
  result.forEach(element => {
    this.team.push({key:element.id,value:element.name});
  });
  console.log(this.team);
}
}, error => console.error(error));

this.teamParams = {
create:()=>{
this.teamElem = document.createElement('input');
    return this.teamElem;
},
read:()=>{
    return this.teamObj.text;
},
destroy:()=>{
    this.teamObj.destroy();
},
write:()=>{
    this.teamObj = new DropDownList({
    dataSource: this.team,
    fields: { value: 'key', text: 'value' },
placeholder: 'Select a team',
floatLabelType: 'Never'
});
this.teamObj.appendTo(this.teamElem);
}};
}

loadUser():void{
  this.http.get<User[]>(baseURIConfig+'/Admin/users').subscribe((result:User[]) => {
    console.log(result);
if(result==null)
  window.alert("No content!");
else{  
  result.forEach(element => {
    this.user.push({key:element.id,value:element.userName});
  });
  console.log(this.user);
}
}, error => console.error(error));

this.userParams = {
create:()=>{
this.userElem = document.createElement('input');
    return this.userElem;
},
read:()=>{
    return this.userObj.text;
},
destroy:()=>{
    this.userObj.destroy();
},
write:()=>{
    this.userObj = new DropDownList({
    dataSource: this.user,
    fields: { value: 'key', text: 'value' },
placeholder: 'Select a user',
floatLabelType: 'Never'
});
this.userObj.appendTo(this.userElem);
}};
}

  ngOnInit(): void {

  this.loadGame();
  this.loadRank();
  this.loadGoal();
  this.loadTeam();
  this.loadUser();

  this.getData();
      
      this.initialPage = { pageSize: 3};
      this.data = data;
      this.editSettings = {
        showConfirmDialog: true, showDeleteConfirmDialog: true,
        allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'
    };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.gameNameRules = { required: true};
      this.rankNameRules = { required: true};
      this.teamNameRules = { required: true};
      this.goalNameRules = { required: true};
      this.playerNameRules ={ required: true,minLength:6};
      this.playerIdRules ={ required: true,number:true};
      this.decencyRules = {required:true,range:[1,100],number:true}
      this.Grid.dataSourceChanged.subscribe(generatorOrNext=>{console.log(generatorOrNext)}, 
        error=>{console.log(error)},complete=>{console.log(complete)})
  }

  change(args: ChangeEventArgs) {
    console.log("page");
  }

actionComplete(args) {
  console.log(args.requestType);
  //console.log(this.gameObj.value);
  // console.log(this.gameObj.index);
  // console.log(this.gameObj.text);
  
  if(args.requestType==='save')
  {
    var records = this.Grid.getSelectedRecords();

    console.log("Operation name: "+ this.operationSate);
    if(this.operationSate==='Add')
    {
      var player = records[0] as PlayerInfo;
      player.gameId=this.gameObj.value as number;
      player.rankId=this.rankObj.value as number;
      player.goalId=this.goalObj.value as number;
      player.teamId=this.teamObj.value as number;
      player.appUserId=this.userObj.value as number;
      console.log(player.teamId);
      player.serverId=1;
      console.log(player);
      this.http.post(baseURIConfig+'/PlayerManage/item',player).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Something is wrong!");
      });

    this.operationSate='';
    }
    else if(this.operationSate==='Edit')
    {
      var updatedPlayer = records[0] as PlayerInfo;
      updatedPlayer.gameId=this.gameObj.value as number;
      updatedPlayer.rankId=this.rankObj.value as number;
      updatedPlayer.goalId=this.goalObj.value as number;
      updatedPlayer.teamId=this.teamObj.value as number;
      //updatedPlayer.appUserId=this.userObj.value as number;
      console.log(updatedPlayer);
      this.http.put(baseURIConfig+'/PlayerManage/item',updatedPlayer).subscribe(
        (res:WtpResponse)=>{
          console.log(res.message); 
          window.alert(res.message)},
        (err:WtpResponse)=>{console.log("Error");
        window.alert("Something is wrong!");
      }); 
    this.operationSate='';
    }
    this.getData();
  }
  else if(this.operationSate==='Delete' && args.requestType==='delete')
  {
    console.log("Operation name: "+ this.operationSate);   
      this.http.delete(baseURIConfig+'/PlayerManage/item')
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
   var z = this.Grid.getSelectedRecords() as PlayerInfo[];
   this.currentPlayer = z[0];
   console.log(this.currentPlayer);
}

getData():void
{
  this.http.get<PlayerInfo[]>(baseURIConfig+'/PlayerManage/list/info').subscribe(result => {
    console.log(result);
if(result==null)
  window.alert("No content!");
else{  
  this.data = result;
}
}, error => console.error(error));
}

}
