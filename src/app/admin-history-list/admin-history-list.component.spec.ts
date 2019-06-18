import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoryListComponent } from './admin-history-list.component';

describe('AdminHistoryListComponent', () => {
  let component: AdminHistoryListComponent;
  let fixture: ComponentFixture<AdminHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
