import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerMerchantTerminalsComponent } from './acquirer-merchant-terminals.component';

describe('AcquirerMerchantTerminalsComponent', () => {
  let component: AcquirerMerchantTerminalsComponent;
  let fixture: ComponentFixture<AcquirerMerchantTerminalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerMerchantTerminalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerMerchantTerminalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
