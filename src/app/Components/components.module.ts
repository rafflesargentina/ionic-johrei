import { registerLocaleData, CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ImageCropperModule } from "ngx-image-cropper"
import { IonicModule } from "@ionic/angular"
import { NgModule, LOCALE_ID } from "@angular/core"

import { CardEventoComponent } from "./card-evento/card-evento.component"
import { CardNoticiaComponent } from "./card-noticia/card-noticia.component"
import { HeaderComponent } from "./header/header.component"
import { SeleccionarArchivoComponent } from "./seleccionar-archivo/seleccionar-archivo.component"

import localeEs from "@angular/common/locales/es"
import { AudioPlayerComponent } from "./audio-player/audio-player.component"

registerLocaleData(localeEs)

@NgModule({
    imports: [
        CommonModule,    
        FormsModule,
        ImageCropperModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AudioPlayerComponent,
        CardEventoComponent,
        CardNoticiaComponent,
        HeaderComponent,
        SeleccionarArchivoComponent,
    ],
    exports: [
        AudioPlayerComponent,
        CardEventoComponent,
        CardNoticiaComponent,
        HeaderComponent,
        SeleccionarArchivoComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "es"}
    ]
})

export class ComponentsModule {}
