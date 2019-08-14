import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CcListComponent } from './cc-list/cc-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CcListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CryptocurrencyRoutingModule
  ]
})
export class CryptocurrencyModule { }
