import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerMerchantDetailsComponent } from './acquirer-merchant-details.component';

describe('AcquirerMerchantDetailsComponent', () => {
  let component: AcquirerMerchantDetailsComponent;
  let fixture: ComponentFixture<AcquirerMerchantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerMerchantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerMerchantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
