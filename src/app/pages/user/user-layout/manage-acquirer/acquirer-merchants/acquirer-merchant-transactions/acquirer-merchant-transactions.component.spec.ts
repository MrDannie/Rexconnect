import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerMerchantTransactionsComponent } from './acquirer-merchant-transactions.component';

describe('AcquirerMerchantTransactionsComponent', () => {
  let component: AcquirerMerchantTransactionsComponent;
  let fixture: ComponentFixture<AcquirerMerchantTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerMerchantTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerMerchantTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
