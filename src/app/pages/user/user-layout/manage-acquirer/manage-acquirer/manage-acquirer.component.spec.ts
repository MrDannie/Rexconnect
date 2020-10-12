import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAcquirerComponent } from './manage-acquirer.component';

describe('ManageAcquirerComponent', () => {
  let component: ManageAcquirerComponent;
  let fixture: ComponentFixture<ManageAcquirerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAcquirerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
