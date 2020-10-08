import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerRoutesComponent } from './acquirer-routes.component';

describe('AcquirerRoutesComponent', () => {
  let component: AcquirerRoutesComponent;
  let fixture: ComponentFixture<AcquirerRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
