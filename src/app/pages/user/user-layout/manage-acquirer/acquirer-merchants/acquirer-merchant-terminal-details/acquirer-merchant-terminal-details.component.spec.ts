import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerMerchantTerminalDetailsComponent } from './acquirer-merchant-terminal-details.component';

describe('AcquirerMerchantTerminalDetailsComponent', () => {
  let component: AcquirerMerchantTerminalDetailsComponent;
  let fixture: ComponentFixture<AcquirerMerchantTerminalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerMerchantTerminalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerMerchantTerminalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
