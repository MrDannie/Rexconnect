import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerUsersComponent } from './acquirer-users.component';

describe('AcquirerUsersComponent', () => {
  let component: AcquirerUsersComponent;
  let fixture: ComponentFixture<AcquirerUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
