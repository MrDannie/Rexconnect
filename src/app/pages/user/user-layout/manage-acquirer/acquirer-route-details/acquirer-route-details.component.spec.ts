import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerRouteDetailsComponent } from './acquirer-route-details.component';

describe('AcquirerRouteDetailsComponent', () => {
  let component: AcquirerRouteDetailsComponent;
  let fixture: ComponentFixture<AcquirerRouteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerRouteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerRouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
