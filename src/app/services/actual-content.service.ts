import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualContentService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  changeSubject(value: boolean) {
    this.subject = new BehaviorSubject(value);
  }
  getObservableValue(): Observable<boolean> {
    return this.subject.asObservable();
  }
}