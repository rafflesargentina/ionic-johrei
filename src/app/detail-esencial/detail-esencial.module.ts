import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"

import { DetailEsencialPage } from "./detail-esencial.page"
import { DetailEsencialPageRoutingModule } from "./detail-esencial-routing.module"

@NgModule({
    imports: [
        CommonModule,
        DetailEsencialPageRoutingModule,
        FormsModule,
        IonicModule
    ],
    declarations: [DetailEsencialPage]
})
export class DetailEsencialPageModule {}
