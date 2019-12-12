import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtorFilmeFormComponent } from './ator-filme-form.component';

describe('AtorFilmeFormComponent', () => {
  let component: AtorFilmeFormComponent;
  let fixture: ComponentFixture<AtorFilmeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtorFilmeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtorFilmeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
