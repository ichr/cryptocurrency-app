import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcListComponent } from './cc-list/cc-list.component';
import { CcDetailComponent } from 'app/cryptocurrency/cc-detail/cc-detail.component';

const routes: Routes = [
  {
    path: 'cryptocurrencies',
    component: CcListComponent
  },
  {
    path: 'cryptocurrencies/:symbol',
    component: CcDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrencyRoutingModule { }
