import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNewProfileComponent } from './section-new-profile.component';

describe('SectionNewProfileComponent', () => {
  let component: SectionNewProfileComponent;
  let fixture: ComponentFixture<SectionNewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
