import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtspComponent } from './ptsp.component';

describe('PtspComponent', () => {
  let component: PtspComponent;
  let fixture: ComponentFixture<PtspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
