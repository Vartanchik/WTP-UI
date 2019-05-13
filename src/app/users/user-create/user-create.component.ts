import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/interfaces/registerModel';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  ngOnInit(){}

  user: RegisterModel = new RegisterModel();

    constructor(private dataService: UserService, private router: Router) { }

    //Save changes and redirect to base admin page
    save() {
      var result = confirm("Are you sure to create user?( Email: "+this.user.email + " || UserName:"+ this.user.userName+")");
        if(result)
          this.dataService.insertUser(this.user).pipe(
          catchError(this.handleError)).subscribe(data => this.router.navigateByUrl("/"));
    }

    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      }
      else if(error instanceof HttpErrorResponse)
        {
          errorMessage = error.error.value+"! Please try again!";
        } 
      else {
        // server-side error
          errorMessage="Username or Email already exists! Try another";
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }


}
