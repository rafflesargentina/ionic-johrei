import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { FormNoticiasPageRoutingModule } from "./form-noticias-routing.module"

import { FormNoticiasPage } from "./form-noticias.page"
import { ComponentsModule } from "../Components/components.module"
import { NoticiasService } from "../Services/noticias.service"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        IonicModule,
        FormNoticiasPageRoutingModule
    ],
    declarations: [FormNoticiasPage,],
    providers: [NoticiasService]
})
export class FormNoticiasPageModule {}
