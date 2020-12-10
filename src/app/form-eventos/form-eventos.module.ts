import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormEventosPageRoutingModule } from "./form-eventos-routing.module"

import { FormEventosPage } from "./form-eventos.page"
import { ComponentsModule } from "../Components/components.module"
import { EventosService } from "../Services/eventos.service"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        FormEventosPageRoutingModule
    ],
    declarations: [FormEventosPage],
    providers: [EventosService]
})
export class FormEventosPageModule {}
