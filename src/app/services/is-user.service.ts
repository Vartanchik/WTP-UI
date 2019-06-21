import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsUserService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
  }

  setValue(value: boolean) {
    this.subject.next(value);
  }

  getValue(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
