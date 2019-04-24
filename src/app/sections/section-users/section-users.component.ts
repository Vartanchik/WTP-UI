import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';

export class UserInfo{
  constructor(
    public id:number = 0,
    public username:string = '',
    public email:string = '',
    public photoUrl:string = '', 
    public gender:string = '', 
    public birthday:Date= new Date(2019,12,3), 
    public country: string = '', 
    public steamId: string = ''
  ){}
}

@Component({
  selector: 'app-section-users',
  templateUrl: './section-users.component.html',
  styleUrls: ['./section-users.component.scss']
})
export class SectionUsersComponent implements OnInit {
 
  // users: User[] =[
  //   {id:1, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
  //   {id:2, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
  //   {id:3, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
  //   {id:4, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'},
  //   {id:5, username: 'user1', email: 'email1', photoUrl: 'link1', gender:'male', birthday: new Date(2019,12,3), country:'UK', steamId:'123'}
  // ];

  // It maintains list of users
  users: UserInfo[] = [];
  // It maintains UserInfo Model
  userModel: UserInfo;
  // It maintains UserInfo form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;

  constructor() { 
    this.users.push(new UserInfo(1,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
    this.users.push(new UserInfo(2,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
    this.users.push(new UserInfo(3,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
    this.users.push(new UserInfo(4,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
    this.users.push(new UserInfo(5,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
    this.users.push(new UserInfo(6,'username1','email1','photo','gender',new Date(2019,1,1),'country','steamid'));
  }
  
  ngOnInit() {}

  // This method associate to New Button.
  onNew() {
    // Initiate new UserInfo.
    this.userModel = new UserInfo(this.users.length+1);
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display UserInfo entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push UserInfo model object into UserInfo list.
      this.users.push(this.userModel);
    } else {
      // Update the existing properties values based on model.
      this.users[this.selectedRow].id = this.userModel.id;
      this.users[this.selectedRow].username = this.userModel.username;
      this.users[this.selectedRow].email = this.userModel.email;
      this.users[this.selectedRow].photoUrl = this.userModel.photoUrl;
      this.users[this.selectedRow].gender = this.userModel.gender;
      this.users[this.selectedRow].birthday = this.userModel.birthday;
      this.users[this.selectedRow].country = this.userModel.country;
      this.users[this.selectedRow].steamId = this.userModel.steamId;
    }
    // Hide UserInfo entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new UserInfo.
    this.userModel = new UserInfo();
    // Retrieve selected UserInfo from list and assign to model.
    this.userModel = Object.assign({}, this.users[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display UserInfo entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding UserInfo entry from the list.
    this.users.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide UserInfo entry section.
    this.showNew = false;
  }

}
