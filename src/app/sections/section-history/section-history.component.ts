import { Component, OnInit } from '@angular/core';
import {History} from '../../interfaces/history';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { HistoryIndexViewModel } from 'src/app/interfaces/HistoryIndexViewModel';
import { HistorySortState } from 'src/app/interfaces/historySortViewModel';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.scss']
})
export class SectionHistoryComponent implements OnInit {

  // histories: History[] =[
  //   {id:1, admin:{id:1,name:'Admin1',email:'admin1@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:112, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  //   {id:2, admin:{id:2,name:'Admin2',email:'admin2@gmail.com'}, action: 'Delete', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:1123, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  //   {id:3, admin:{id:3,name:'Admin3',email:'admin3@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'User', user:{id:123, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  //   {id:4, admin:{id:4,name:'Admin4',email:'admin4@gmail.com'}, action: 'Create', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:1124, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  //   {id:5, admin:{id:5,name:'Admin5',email:'admin5@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'User', user:{id:12134, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  // ];

  // constructor() { }

  // ngOnInit() {
  // }

  //Array of users at current page
  histories: History[];
  private http: HttpClient;
  private baseUrl: string=this.userService.baseUrl;//"https://localhost:44390/";

  //Current page
  public pageNumber: number = 1;

  //Count of pages
  public Count: number;

  //Count of users at one page
  public itemOnPage:number;
  
  // public sort: UserSortViewModel;
  // public pageView : UserPageViewModel;
  // public filter : UserFilterViewModel;
  public sortBySome:HistorySortState[]=[HistorySortState.EmailAsc,HistorySortState.EmailDesc,
     HistorySortState.NameAsc, HistorySortState.NameDesc,HistorySortState.IdAsc,HistorySortState.IdDesc,
     HistorySortState.UserIdAsc,HistorySortState.UserIdDesc,HistorySortState.AdminIdAsc,
     HistorySortState.AdminIdDesc, HistorySortState.DateAsc, HistorySortState.DateDesc];
  //Sorting field
  public nameOfSort:string[]=[HistorySortState[HistorySortState.EmailAsc],HistorySortState[HistorySortState.EmailDesc],
  HistorySortState[HistorySortState.NameAsc],HistorySortState[HistorySortState.NameDesc],
  HistorySortState[HistorySortState.IdAsc],HistorySortState[HistorySortState.IdDesc],
  HistorySortState[HistorySortState.UserIdAsc], HistorySortState[HistorySortState.UserIdDesc],
  HistorySortState[HistorySortState.AdminIdAsc], HistorySortState[HistorySortState.AdminIdDesc],
  HistorySortState[HistorySortState.DateAsc], HistorySortState[HistorySortState.DateDesc]];

  //Selected name of sorting field
  public selectedNumber:string=HistorySortState[HistorySortState.DateDesc];

  //Model, which consists of data about paging, sorting and filters
  public model :HistoryIndexViewModel;

  //Input name pattern for searching
  public searchByName:string='';


constructor(private userService: UserService, http:HttpClient) {
  this.http = http;
 }

ngOnInit() {
  this.load();
}

//Load data from first page which contains filtered and sorted user information by default params
load() {
  this.http.get<HistoryIndexViewModel>(this.baseUrl + 'api/Admin/history?name='+this.searchByName+'&page='+this.pageNumber+'&sortorder='+this.selectedNumber).subscribe(result => {
      
    if(result==null)
      window.alert("No content!");
    else{
      this.model=result;      
      this.histories = result.histories;
      this.pageNumber = result.pageViewModel.pageNumber;
      this.Count = result.pageViewModel.totalPages*result.histories.length;
      this.itemOnPage= result.histories.length;
    }
    }, error => console.error(error));
}

//Load data by changing page
onPageChange = (pageNumber) => {
this.http.get<HistoryIndexViewModel>(this.baseUrl + 'api/Admin/history?name='+this.searchByName+'&page='+pageNumber+'&sortorder='+this.selectedNumber).subscribe(result => {
  
  if(result==null)
  window.alert("No content!");
else{
  this.model=result;
  this.histories = result.histories;
  this.pageNumber = result.pageViewModel.pageNumber;
  this.Count = result.pageViewModel.totalPages*result.histories.length;
  this.itemOnPage= result.histories.length;
  }
  }, error => console.error(error));
}

//Apply filters
search()
{
    this.onPageChange(1);
}

}
