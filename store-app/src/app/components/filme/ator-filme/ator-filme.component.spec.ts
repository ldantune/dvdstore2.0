import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtorFilmeComponent } from './ator-filme.component';

describe('AtorFilmeComponent', () => {
  let component: AtorFilmeComponent;
  let fixture: ComponentFixture<AtorFilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtorFilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtorFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
