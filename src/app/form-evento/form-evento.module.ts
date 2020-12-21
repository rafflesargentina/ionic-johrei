import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"

import { ComponentsModule } from "../Components/components.module"
import { FormEventoPageRoutingModule } from "./form-evento-routing.module"
import { FormEventoPage } from "./form-evento.page"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormEventoPageRoutingModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    declarations: [FormEventoPage],
})

export class FormEventoPageModule {}
