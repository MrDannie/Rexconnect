import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePtspComponent } from './update-ptsp.component';

describe('UpdatePtspComponent', () => {
  let component: UpdatePtspComponent;
  let fixture: ComponentFixture<UpdatePtspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePtspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePtspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
