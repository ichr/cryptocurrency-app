import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CcListComponent } from './cc-list/cc-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CryptocurrencyState } from './shared/cryptocurrency.state';
import { CcDetailComponent } from './cc-detail/cc-detail.component';

@NgModule({
  declarations: [CcListComponent, CcDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CryptocurrencyRoutingModule,
    NgxsModule.forFeature([CryptocurrencyState])
  ]
})
export class CryptocurrencyModule { }
