import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing.component';

describe('AcquirerFeeSharingComponent', () => {
  let component: AcquirerFeeSharingComponent;
  let fixture: ComponentFixture<AcquirerFeeSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerFeeSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerFeeSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
