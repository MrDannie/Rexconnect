import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalTransactionsComponent } from './terminal-transactions.component';

describe('TerminalTransactionsComponent', () => {
  let component: TerminalTransactionsComponent;
  let fixture: ComponentFixture<TerminalTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
