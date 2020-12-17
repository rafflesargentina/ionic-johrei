import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAncestorsPage } from './list-ancestors.page';

const routes: Routes = [
  {
    path: '',
    component: ListAncestorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAncestorsPageRoutingModule {}
