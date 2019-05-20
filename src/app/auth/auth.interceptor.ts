import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, pipe, throwError } from "rxjs";
import { tap, catchError, switchMap, finalize, filter, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { AccountService } from 'src/app/services/account.service';
import { Token } from '../interfaces/token-response';

@Injectable({
  providedIn: 'root'
})

//@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private isTokenRefreshing: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  constructor(private router: Router, private service: AccountService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //check if the user login in for the first time
    return next.handle(this.attachTokenToRequest(request)).pipe(
      tap((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) { }
      }),
      catchError((error): Observable<any> => {
        if(error instanceof HttpErrorResponse) {
          switch((<HttpErrorResponse>error).status) {
            case 401:
              this.router.navigateByUrl('/account/login');
              return this.handleHttpResponseError(request, next);

                        // case 400:
                        //     this.router.navigateByUrl('/home');
                        //     return <any>this.service.removeAuthInfo();
            default:
            return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    )
  }
  
  // Method to handle http error response
  private handleHttpResponseError(request : HttpRequest<any>, next : HttpHandler) {
    // First thing to check if the token is in process of refreshing
    // If the Token Refresheing is not true
    if(!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      
      // Any existing value is set to null
      // Reset here so that the following requests wait until the token comes back from the refresh token API call
      this.tokenSubject.next(null);
      
      // call the API to refresh the token
      return this.service.getNewRefreshToken()
      .pipe(
        switchMap((res: Token) => {
          if(res) {
            this.tokenSubject.next(res.token);
            this.service.setAuthInfo(res);
            return next.handle(this.attachTokenToRequest(request));
          }
          return <any>this.onLogout();
        }),
        catchError((err, obs) => {
          return <any>this.onLogout();
          //return this.handleError(err);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        })
        );
      } else {
        this.isTokenRefreshing = false;
        this.onLogout();
      }
    }
    
    private attachTokenToRequest(request: HttpRequest<any>) {
      let token = this.service.getItem('token');
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    onLogout() {
      this.service.removeAuthInfo();
      this.router.navigate(['/home']);
    }

}