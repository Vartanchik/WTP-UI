import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminRankListComponent} from './admin-rank-list.component';

describe('AdminRankListComponent', () => {
  let component: AdminRankListComponent;
  let fixture: ComponentFixture<AdminRankListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRankListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
