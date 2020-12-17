import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAncestorsPageRoutingModule } from './list-ancestors-routing.module';

import { ListAncestorsPage } from './list-ancestors.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ListAncestorsPageRoutingModule
  ],
  declarations: [ListAncestorsPage]
})
export class ListAncestorsPageModule {}
