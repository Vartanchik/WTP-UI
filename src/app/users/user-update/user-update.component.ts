import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateModel} from 'src/app/interfaces/updateModel';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/internal/operators/catchError';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  id: number;
  user: UpdateModel = new UpdateModel();
  loaded: boolean = false;

  constructor(private userService: UserService, private router: Router, activeRoute: ActivatedRoute) {
    this.id = Number.parseInt(activeRoute.snapshot.params['id']);
  }

  //Load data about user by id
  ngOnInit() {
    if (this.id) {
      this.userService.getUserById(this.id)
        .subscribe((data: UpdateModel) => {
          this.user = data;
          if (this.user != null) {
            this.loaded = true;
          }
        });
    }
  }

  //Save changes and redirect to base admin page
  save() {
    var result = confirm('Are you sure to update user?( Email: ' + this.user.email + ' || UserName:' + this.user.userName + ')');
    if (result) {
      this.userService.updateUser(this.id, this.user).pipe(
        catchError(this.handleError)).subscribe(data => this.router.navigateByUrl('/'));
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error instanceof HttpErrorResponse) {
      //console.log(error.error.message);
      errorMessage = error.error.message + '! Please try again!';
    } else {
      // server-side error
      errorMessage = 'Username or Email already exists! Try another';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
