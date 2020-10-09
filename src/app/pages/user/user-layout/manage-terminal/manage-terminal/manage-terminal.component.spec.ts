import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTerminalComponent } from './manage-terminal.component';

describe('ManageTerminalComponent', () => {
  let component: ManageTerminalComponent;
  let fixture: ComponentFixture<ManageTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
