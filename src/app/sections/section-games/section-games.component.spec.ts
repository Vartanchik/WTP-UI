import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionGamesComponent} from './section-games.component';

describe('SectionGamesComponent', () => {
  let component: SectionGamesComponent;
  let fixture: ComponentFixture<SectionGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionGamesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
