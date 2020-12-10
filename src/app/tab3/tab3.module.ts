import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { Tab3PageRoutingModule } from "./tab3-routing.module"

import { Tab3Page } from "./tab3.page"
import { ComponentsModule } from "../Components/components.module"
import { NoticiasService } from "../Services/noticias.service"

@NgModule({
    entryComponents: [], //para manejar los medales de selección
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        Tab3PageRoutingModule
    ],
    declarations: [Tab3Page],
    providers: [NoticiasService]
})
export class Tab3PageModule {}
