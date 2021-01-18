import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtspDetailsComponent } from './ptsp-details.component';

describe('PtspDetailsComponent', () => {
  let component: PtspDetailsComponent;
  let fixture: ComponentFixture<PtspDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtspDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtspDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
