import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormPasswordPageRoutingModule } from "./form-password-routing.module"

import { FormPasswordPage } from "./form-password.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        FormPasswordPageRoutingModule
    ],
    declarations: [FormPasswordPage]
})
export class FormPasswordPageModule {}
