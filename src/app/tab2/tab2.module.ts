import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"

import { ComponentsModule } from "../Components/components.module"
import { Tab2Page } from "./tab2.page"
import { Tab2PageRoutingModule } from "./tab2-routing.module"

import { LOCALE_ID } from "@angular/core"
import { registerLocaleData } from "@angular/common"
import localeEs from "@angular/common/locales/es"

registerLocaleData(localeEs)

@NgModule({
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
