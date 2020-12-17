import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAncestroPage } from './form-ancestro.page';

const routes: Routes = [
  {
    path: '',
    component: FormAncestroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAncestroPageRoutingModule {}
