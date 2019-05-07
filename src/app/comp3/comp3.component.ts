import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from '../service/communication.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component implements OnInit {

  updatedValue$: Observable<number>;

  constructor(private svc: CommunicationService) { }

  ngOnInit() {
    this.updatedValue$ = this.svc.getObservableValue();
  }

}
