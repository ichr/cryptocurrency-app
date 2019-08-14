import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcListComponent } from './cc-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CryptocurrencyState } from 'app/cryptocurrency/shared/cryptocurrency.state';
import { SettingsState } from 'app/settings/shared/settings.state';

describe('CcListComponent', () => {
  let component: CcListComponent;
  let fixture: ComponentFixture<CcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CryptocurrencyState, SettingsState])
      ],
      declarations: [ CcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
