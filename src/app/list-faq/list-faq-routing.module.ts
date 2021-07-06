import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFAQPage } from './list-faq.page';

const routes: Routes = [
  {
    path: '',
    component: ListFAQPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFAQPageRoutingModule {}
