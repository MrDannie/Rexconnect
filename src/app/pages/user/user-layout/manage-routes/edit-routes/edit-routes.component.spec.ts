import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoutesComponent } from './edit-routes.component';

describe('EditRoutesComponent', () => {
  let component: EditRoutesComponent;
  let fixture: ComponentFixture<EditRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
