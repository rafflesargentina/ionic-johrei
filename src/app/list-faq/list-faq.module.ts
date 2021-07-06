import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFAQPageRoutingModule } from './list-faq-routing.module';

import { ListFAQPage } from './list-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFAQPageRoutingModule
  ],
  declarations: [ListFAQPage]
})
export class ListFAQPageModule {}
