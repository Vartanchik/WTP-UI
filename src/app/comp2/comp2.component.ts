import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../service/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss']
})
export class Comp2Component implements OnInit, OnDestroy {

  updatedValue: number;
  disposable: Subscription = new Subscription();

  constructor(private svc: CommunicationService) { }

  ngOnInit() {
    this.disposable.add(
      this.svc.getObservableValue().subscribe(
        val => {
          this.updatedValue = val;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.disposable.unsubscribe();
  }

}
