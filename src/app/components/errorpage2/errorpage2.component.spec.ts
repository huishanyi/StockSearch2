import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Errorpage2Component} from './errorpage2.component';

describe('Errorpage2Component', () => {
  let component: Errorpage2Component;
  let fixture: ComponentFixture<Errorpage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Errorpage2Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Errorpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
