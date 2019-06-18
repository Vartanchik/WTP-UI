import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterListComponent } from './admin-filter-list.component';

describe('AdminFilterListComponent', () => {
  let component: AdminFilterListComponent;
  let fixture: ComponentFixture<AdminFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
