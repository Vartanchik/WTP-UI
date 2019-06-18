import { Component, OnInit } from '@angular/core';
import { Lock } from 'src/app/interfaces/lock';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/userDataForAdmin';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-lock-user',
  templateUrl: './lock-user.component.html',
  styleUrls: ['./lock-user.component.scss']
})
export class LockUserComponent implements OnInit {

    id: number;
    user: Lock = new Lock();
 
    constructor(private userService: UserService, private router: Router, activeRoute: ActivatedRoute) {
        this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
    }
 
    ngOnInit() {
    }
 
    //Save changes and redirect to base admin page
    save() {
        var result = confirm("Are you sure to lock user for "+this.user.days+" days?)");
        if(result)
            this.userService.lockUser(this.id,this.user).pipe(
            catchError(this.handleError)).subscribe(data => this.router.navigateByUrl("/"));
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
            errorMessage="Days should be >0 and <100";
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }
}
