import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAncestrosPlanillaPageRoutingModule } from './form-ancestros-planilla-routing.module';

import { FormAncestrosPlanillaPage } from './form-ancestros-planilla.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    FormAncestrosPlanillaPageRoutingModule
  ],
  declarations: [FormAncestrosPlanillaPage]
})
export class FormAncestrosPlanillaPageModule {}
