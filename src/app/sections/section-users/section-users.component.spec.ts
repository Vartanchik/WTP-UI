import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUsersComponent } from './section-users.component';

describe('SectionUsersComponent', () => {
  let component: SectionUsersComponent;
  let fixture: ComponentFixture<SectionUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
