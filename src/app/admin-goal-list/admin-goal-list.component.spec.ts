import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoalListComponent } from './admin-goal-list.component';

describe('AdminGoalListComponent', () => {
  let component: AdminGoalListComponent;
  let fixture: ComponentFixture<AdminGoalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGoalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
