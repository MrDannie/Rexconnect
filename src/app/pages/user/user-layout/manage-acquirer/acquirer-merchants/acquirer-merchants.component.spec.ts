import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerMerchantsComponent } from './acquirer-merchants.component';

describe('AcquirerMerchantsComponent', () => {
  let component: AcquirerMerchantsComponent;
  let fixture: ComponentFixture<AcquirerMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
