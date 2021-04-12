import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerTerminalsComponent } from './acquirer-terminals.component';

describe('AcquirerTerminalsComponent', () => {
  let component: AcquirerTerminalsComponent;
  let fixture: ComponentFixture<AcquirerTerminalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerTerminalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerTerminalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
