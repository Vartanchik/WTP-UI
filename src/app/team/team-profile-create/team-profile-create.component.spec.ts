import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamProfileCreateComponent} from './team-profile-create.component';

describe('TeamProfileCreateComponent', () => {
  let component: TeamProfileCreateComponent;
  let fixture: ComponentFixture<TeamProfileCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamProfileCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
