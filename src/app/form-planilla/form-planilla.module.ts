import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormPlanillaPageRoutingModule } from "./form-planilla-routing.module"

import { FormPlanillaPage } from "./form-planilla.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        FormPlanillaPageRoutingModule
    ],
    declarations: [FormPlanillaPage]
})
export class FormPlanillaPageModule {}
