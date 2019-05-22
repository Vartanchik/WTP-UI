import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/UserDataForAdmin';
import { HttpClient } from '@angular/common/http';
import { SortState } from 'src/app/interfaces/UserSortViewModel';
import { UserIndexViewModel } from 'src/app/interfaces/UserIndexViewModel';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
 
    //Array of users at current page
    users: User[];
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
    public sortBySome:SortState[]=[SortState.EmailAsc,SortState.EmailDesc, SortState.NameAsc, SortState.NameDesc,SortState.IdAsc,SortState.IdDesc];
    //Sorting field
    public nameOfSort:string[]=[SortState[SortState.EmailAsc],SortState[SortState.EmailDesc],SortState[SortState.NameAsc],SortState[SortState.NameDesc],SortState[SortState.IdAsc],SortState[SortState.IdDesc]];

    //Selected name of sorting field
    public selectedNumber:string=SortState[SortState.NameDesc];

    //Model, which consists of data about paging, sorting and filters
    public model :UserIndexViewModel;

    //Input name pattern for searching
    public searchByName:string='';

    //filter for deleted users
    public enableDeleted:boolean = true;

    //filter for lock users
    public enableLocked:boolean = true;

  constructor(private userService: UserService, http:HttpClient) {
    this.http = http;
   }

  ngOnInit() {
    this.load();
  }

  //Load data from first page which contains filtered and sorted user information by default params
  load() {
    this.http.get<UserIndexViewModel>(this.baseUrl + 'api/Admin/users/pagination?name='+this.searchByName+'&page='+this.pageNumber+'&sortorder='+this.selectedNumber+'&enableDeleted='+this.enableDeleted+'&enableLocked='+this.enableLocked).subscribe(result => {
        
      if(result==null)
        window.alert("No content!");
      else{
        this.model=result;      
        this.users = result.users;
        this.pageNumber = result.pageViewModel.pageNumber;
        this.Count = result.pageViewModel.totalPages*result.users.length;
        this.itemOnPage= result.users.length;
      }
      }, error => console.error(error));
}

  //Load data by changing page
  onPageChange = (pageNumber) => {
  this.http.get<UserIndexViewModel>(this.baseUrl + 'api/Admin/users/pagination?name='+this.searchByName+'&page='+pageNumber+'&sortorder='+this.selectedNumber+'&enableDeleted='+this.enableDeleted+'&enableLocked='+this.enableLocked).subscribe(result => {
    
    if(result==null)
    window.alert("No content!");
  else{
    this.model=result;
    this.users = result.users;
    this.pageNumber = result.pageViewModel.pageNumber;
    this.Count = result.pageViewModel.totalPages*result.users.length;
    this.itemOnPage= result.users.length;
    }
    }, error => console.error(error));
}

  //Apply filters
  search()
  {
      this.onPageChange(1);
  }

  //Delete users profile
   delete(id: number) {
        var result = confirm("Are you sure to delete user with id: "+id+"?)");
        if(result)
            this.userService.deleteUser(id).subscribe(data => this.load());
    }

    //UnLock users profile
    unLock(id: number) {
        var result = confirm("Are you sure to unlock user with id: "+id+"?)");
        if(result)
            this.userService.unLockUser(id).subscribe(data => this.load());
    }
}