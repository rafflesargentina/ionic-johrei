import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { NgModule } from "@angular/core"

import { ComponentsModule } from "../Components/components.module"
import { RecuperarContrasenaPage } from "./recuperar-contrasena.page"
import { RecuperarContrasenaPageRoutingModule } from "./recuperar-contrasena-routing.module"

@NgModule({
    imports: [
        CommonModule,  
        ComponentsModule,
        FormsModule,    
        IonicModule,
        ReactiveFormsModule,
        RecuperarContrasenaPageRoutingModule
    ],
    declarations: [RecuperarContrasenaPage]
})
export class RecuperarContrasenaPageModule {}
