import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguagemFormComponent } from './linguagem-form.component';

describe('LinguagemFormComponent', () => {
  let component: LinguagemFormComponent;
  let fixture: ComponentFixture<LinguagemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinguagemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinguagemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
