import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerListComponent } from './admin-player-list.component';

describe('AdminPlayerListComponent', () => {
  let component: AdminPlayerListComponent;
  let fixture: ComponentFixture<AdminPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
