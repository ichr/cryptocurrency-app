import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDetailComponent } from './cc-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { CryptocurrencyState } from 'app/cryptocurrency/shared/cryptocurrency.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsState } from 'app/settings/shared/settings.state';

describe('CcDetailComponent', () => {
  let component: CcDetailComponent;
  let fixture: ComponentFixture<CcDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CryptocurrencyState, SettingsState])],
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
