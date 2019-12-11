import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretorFormComponent } from './diretor-form.component';

describe('DiretorFormComponent', () => {
  let component: DiretorFormComponent;
  let fixture: ComponentFixture<DiretorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
