import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerTransactionsComponent } from './acquirer-transactions.component';

describe('AcquirerTransactionsComponent', () => {
  let component: AcquirerTransactionsComponent;
  let fixture: ComponentFixture<AcquirerTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
