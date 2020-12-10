import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormUsuarioPageRoutingModule } from "./form-usuario-routing.module"

import { FormUsuarioPage } from "./form-usuario.page"
import { ComponentsModule } from "../Components/components.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        FormUsuarioPageRoutingModule,
    ],
    declarations: [FormUsuarioPage]
})
export class FormUsuarioPageModule {}
