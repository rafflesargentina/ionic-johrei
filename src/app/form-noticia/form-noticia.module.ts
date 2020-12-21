import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"

import { ComponentsModule } from "../Components/components.module"
import { FormNoticiaPage } from "./form-noticia.page"
import { FormNoticiaPageRoutingModule } from "./form-noticia-routing.module"

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        FormNoticiaPageRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ],
    declarations: [FormNoticiaPage,],
})

export class FormNoticiaPageModule {}
