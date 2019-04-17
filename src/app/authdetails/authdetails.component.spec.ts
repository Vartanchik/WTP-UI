import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthdetailsComponent } from './authdetails.component';

describe('AuthdetailsComponent', () => {
  let component: AuthdetailsComponent;
  let fixture: ComponentFixture<AuthdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
