import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../interfaces/UserDataForAdmin';
import {Lock} from '../interfaces/lock';
import { flatMap,first,shareReplay } from 'rxjs/operators';
import { RegisterModel } from '../interfaces/registerModel';
import { UpdateModel } from '../interfaces/updateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public baseUrl ="https://localhost:44390/";
  private getAllUsersUrl: string =this.baseUrl+"api/Admin/users";
  private createUserUrl: string =this.baseUrl+"api/Admin/users/profiles";
  private createAdminUrl: string =this.baseUrl+"api/Admin/profiles";
  private updateUserUrl: string =this.baseUrl+"api/Admin/users/";
  private deleteUserUrl: string =this.baseUrl+"api/Admin/users/";
  private lockUserUrl: string =this.baseUrl+"api/Admin/users/";
  private unLockUserUrl: string =this.baseUrl+"api/Admin/users/";

  private users$: Observable<User[]>;

  getUsers(): Observable<User[]>
  {
      return this.http.get<User[]>(this.getAllUsersUrl);
  }

  getUserById(id:number): Observable<User>
  {
    return this.getUsers().pipe(flatMap(result=>result),first(user=>user.id==id));
  }

  insertUser(newUser:RegisterModel):Observable<RegisterModel>
  {
    return this.http.post<RegisterModel>(this.createUserUrl,newUser);
  }

  insertAdmin(newUser:RegisterModel):Observable<RegisterModel>
  {
    return this.http.post<RegisterModel>(this.createAdminUrl,newUser);
  }

  updateUser(id:number, editUser:UpdateModel):Observable<User>
  {
    return this.http.put<any>(this.updateUserUrl +id,editUser);
  }

  lockUser(id:number, lockModel:Lock):Observable<User>
  {
    return this.http.put<any>(this.lockUserUrl +id + "/block",lockModel);
  }

  unLockUser(id:number):Observable<User>
  {
    return this.http.put<any>(this.unLockUserUrl+id+"/unblock",null);
  }


  deleteUser(id:number):Observable<any>
  {
    return this.http.delete(this.deleteUserUrl +id);
  }


  // getUsersPagination(): Observable<User[]>
  // {
  //     return this.http.get<User[]>(this.getAllUsersUrl+"/newpagination");
  // }

}
