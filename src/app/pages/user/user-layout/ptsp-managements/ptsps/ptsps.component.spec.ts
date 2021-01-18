import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtspsComponent } from './ptsps.component';

describe('PtspsComponent', () => {
  let component: PtspsComponent;
  let fixture: ComponentFixture<PtspsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtspsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtspsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
