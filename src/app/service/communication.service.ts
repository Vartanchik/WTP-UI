import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private subject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  pushUpdatedValue(value: number) {
    this.subject.next(value);
  }
  getObservableValue(): Observable<number> {
    return this.subject.asObservable();
  }
}
