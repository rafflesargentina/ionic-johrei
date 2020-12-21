import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { Tab4PageRoutingModule } from "./tab4-routing.module"

import { Tab4Page } from "./tab4.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    entryComponents: [], //para manejar los medales de selección
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        Tab4PageRoutingModule
    ],
    declarations: [Tab4Page],
})
export class Tab4PageModule {}
