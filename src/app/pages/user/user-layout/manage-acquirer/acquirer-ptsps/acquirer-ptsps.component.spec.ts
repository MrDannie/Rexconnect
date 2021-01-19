import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerPtspsComponent } from './acquirer-ptsps.component';

describe('AcquirerPtspsComponent', () => {
  let component: AcquirerPtspsComponent;
  let fixture: ComponentFixture<AcquirerPtspsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquirerPtspsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerPtspsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
