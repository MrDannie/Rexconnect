import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerDetailsComponent } from './acquirer-details.component';

describe('AcquirerDetailsComponent', () => {
  let component: AcquirerDetailsComponent;
  let fixture: ComponentFixture<AcquirerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
