import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { Tab2PageRoutingModule } from "./tab2-routing.module"

import { Tab2Page } from "./tab2.page"
import { ComponentsModule } from "../Components/components.module"

//para el manejo de la fecha
import { LOCALE_ID } from "@angular/core"
import localeEs from "@angular/common/locales/es"
import { registerLocaleData } from "@angular/common"
registerLocaleData(localeEs)

@NgModule({
    entryComponents: [], //para manejar los eventos de selección
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        Tab2PageRoutingModule
    ],
    declarations: [Tab2Page],
    providers: [
        {provide: LOCALE_ID, useValue: "es"}
    ]
})
export class Tab2PageModule {}
