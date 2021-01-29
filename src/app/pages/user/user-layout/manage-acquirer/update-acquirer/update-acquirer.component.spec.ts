import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcquirerComponent } from './update-acquirer.component';

describe('UpdateAcquirerComponent', () => {
  let component: UpdateAcquirerComponent;
  let fixture: ComponentFixture<UpdateAcquirerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAcquirerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
