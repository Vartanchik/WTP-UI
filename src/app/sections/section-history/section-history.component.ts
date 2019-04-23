import { Component, OnInit } from '@angular/core';
import {History} from '../../shared/history';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.scss']
})
export class SectionHistoryComponent implements OnInit {

  histories: History[] =[
    {id:1, admin:{id:1,name:'Admin1',email:'admin1@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:112, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
    {id:2, admin:{id:2,name:'Admin2',email:'admin2@gmail.com'}, action: 'Delete', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:1123, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
    {id:3, admin:{id:3,name:'Admin3',email:'admin3@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'User', user:{id:123, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
    {id:4, admin:{id:4,name:'Admin4',email:'admin4@gmail.com'}, action: 'Create', dateOfChange: new Date(2019,1,1), category: 'Game', user:{id:1124, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
    {id:5, admin:{id:5,name:'Admin5',email:'admin5@gmail.com'}, action: 'Update', dateOfChange: new Date(2019,1,1), category: 'User', user:{id:12134, username:'user1', email: 'email1', photoUrl: 'url1', gender: 'male', birthday: new Date(2019,2,2), country:'UK', steamId: '1234567890'},game:{id:1,name:'Cs Go',playersCount:100,description:'Have fun.'}},
  ];

  constructor() { }

  ngOnInit() {
  }

}
