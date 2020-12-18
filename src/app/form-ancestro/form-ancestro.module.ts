import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormAncestroPageRoutingModule } from "./form-ancestro-routing.module"

import { FormAncestroPage } from "./form-ancestro.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        FormAncestroPageRoutingModule
    ],
    declarations: [FormAncestroPage]
})
export class FormAncestroPageModule {}
