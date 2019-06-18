import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagingListComponent } from './admin-paging-list.component';

describe('AdminPagingListComponent', () => {
  let component: AdminPagingListComponent;
  let fixture: ComponentFixture<AdminPagingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPagingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPagingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
