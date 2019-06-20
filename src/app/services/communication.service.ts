import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userId = new BehaviorSubject<number>(0);

  constructor() { }

  currentUserId = this.userId.asObservable();

  setLoginValue(value: boolean) {
    this.subject.next(value);
  }
  getLoginValue(): Observable<boolean> {
    return this.subject.asObservable();
  }

  setUserId(id: number) {
    this.userId.next(id);
  }
}
