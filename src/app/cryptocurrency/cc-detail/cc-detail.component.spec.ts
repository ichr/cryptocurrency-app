import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDetailComponent } from './cc-detail.component';

describe('CcDetailComponent', () => {
  let component: CcDetailComponent;
  let fixture: ComponentFixture<CcDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
