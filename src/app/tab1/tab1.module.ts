import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { Tab1PageRoutingModule } from "./tab1-routing.module"

import { Tab1Page } from "./tab1.page"
import { ComponentsModule } from "../Components/components.module"
import { NoticiasService } from "../Services/noticias.service"

@NgModule({
    entryComponents: [], //para manejar los medales de selección
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        Tab1PageRoutingModule
    ],
    declarations: [Tab1Page],
    providers: [NoticiasService]
})
export class Tab1PageModule {}
