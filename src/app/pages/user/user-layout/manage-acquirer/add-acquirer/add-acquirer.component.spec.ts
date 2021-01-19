import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcquirerComponent } from './add-acquirer.component';

describe('AddAcquirerComponent', () => {
  let component: AddAcquirerComponent;
  let fixture: ComponentFixture<AddAcquirerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcquirerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
