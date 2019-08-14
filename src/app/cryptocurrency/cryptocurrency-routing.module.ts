import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcListComponent } from './cc-list/cc-list.component';

const routes: Routes = [
  {
    path: 'cryptocurrencies',
    component: CcListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrencyRoutingModule { }
