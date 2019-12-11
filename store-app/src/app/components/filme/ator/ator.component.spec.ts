import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtorComponent } from './ator.component';

describe('AtorComponent', () => {
  let component: AtorComponent;
  let fixture: ComponentFixture<AtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
