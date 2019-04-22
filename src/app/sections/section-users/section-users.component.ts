import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';

@Component({
  selector: 'app-section-users',
  templateUrl: './section-users.component.html',
  styleUrls: ['./section-users.component.scss']
})
export class SectionUsersComponent implements OnInit {

  constructor() { }

  users: User[] =[
    {id:1, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
    {id:2, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
    {id:3, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
    {id:4, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
    {id:5, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'}
  ];

  ngOnInit() {
  }

}
