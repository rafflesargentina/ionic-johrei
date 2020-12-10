import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { DetailEventoPageRoutingModule } from "./detail-evento-routing.module"

import { DetailEventoPage } from "./detail-evento.page"

//para el manejo de la fecha
import { LOCALE_ID } from "@angular/core"
import localeEs from "@angular/common/locales/es"
import { registerLocaleData } from "@angular/common"
import { ComponentsModule } from "../Components/components.module"
registerLocaleData(localeEs)

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        DetailEventoPageRoutingModule
    ],
    declarations: [DetailEventoPage],
    providers: [
        {provide: LOCALE_ID, useValue: "es"}
    ]
})
export class DetailEventoPageModule {}
