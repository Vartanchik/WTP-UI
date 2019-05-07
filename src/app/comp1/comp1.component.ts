import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../service/communication.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {

  someRandomCounter = 1;

  constructor(private svc: CommunicationService) { }

  ngOnInit() {
  }

  updateOtherComponent() {
    this.svc.pushUpdatedValue(this.someRandomCounter);
    this.someRandomCounter++;
  }

}
