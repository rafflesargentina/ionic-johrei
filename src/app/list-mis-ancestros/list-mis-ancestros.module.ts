import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { ListMisAncestrosPageRoutingModule } from "./list-mis-ancestros-routing.module"

import { ListMisAncestrosPage } from "./list-mis-ancestros.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        ListMisAncestrosPageRoutingModule
    ],
    declarations: [ListMisAncestrosPage]
})
export class ListMisAncestrosPageModule {}
