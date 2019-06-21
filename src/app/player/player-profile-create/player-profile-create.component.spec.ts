import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerProfileCreateComponent} from './player-profile.component';

describe('PlayerProfileComponent', () => {
  let component: PlayerProfileCreateComponent;
  let fixture: ComponentFixture<PlayerProfileCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerProfileCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
