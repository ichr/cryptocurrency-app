import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CcListComponent } from './cc-list/cc-list.component';

@NgModule({
  declarations: [CcListComponent],
  imports: [
    CommonModule,
    CryptocurrencyRoutingModule
  ]
})
export class CryptocurrencyModule { }
