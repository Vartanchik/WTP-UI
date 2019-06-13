import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProfileEditComponent } from './team-profile-edit.component';

describe('TeamProfileEditComponent', () => {
  let component: TeamProfileEditComponent;
  let fixture: ComponentFixture<TeamProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
