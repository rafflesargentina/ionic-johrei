import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular"
import { SplashScreen } from "@ionic-native/splash-screen/ngx"
import { StatusBar } from "@ionic-native/status-bar/ngx"

import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"

import { AngularFireMessagingModule } from "@angular/fire/messaging"
import { AngularFireModule } from "angularfire2"
import { AngularFireDatabaseModule } from "angularfire2/database"
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { GooglePlus } from "@ionic-native/google-plus/ngx"
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore" 
import { Camera } from "@ionic-native/camera/ngx"
import { Crop } from "@ionic-native/crop/ngx"

import { ImagePicker } from "@ionic-native/image-picker/ngx"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from "../environments/environment"

import { ImageCropperModule } from "ngx-image-cropper"
import { RecortarImagenPage } from "./recortar-imagen/recortar-imagen.page"
import { ServiceWorkerModule } from "@angular/service-worker"
import { ComponentsModule } from "./Components/components.module"
import { RecortarImagenPageModule } from "./recortar-imagen/recortar-imagen.module"
import { TabsPageModule } from "./tabs/tabs.module"
import { FileTransfer} from "@ionic-native/file-transfer/ngx"
import { FileChooser } from "@ionic-native/file-chooser/ngx"
import { AuthInterceptorService } from "./Services/auth-interceptor-service.service"
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx"
import { Deeplinks } from "@ionic-native/deeplinks/ngx"

const firebaseConfig = {
    apiKey: "AIzaSyAYAbLJnwJPwltC6tC1NaPjryYuIKTB1zM",
    authDomain: "gestionsocialup.firebaseapp.com",
    databaseURL: "https://gestionsocialup.firebaseio.com",
    projectId: "gestionsocialup",
    storageBucket: "gestionsocialup.appspot.com",
    messagingSenderId: "304287906727",
    appId: "1:304287906727:web:b7e9cdb7f3ddd8bf93d482",
    measurementId: "G-PDRLW20SDT"
}

@NgModule({
    declarations: [
        AppComponent,    
    //RecortarImagenPage
    ],
    entryComponents: [
        RecortarImagenPage,
    ],
    imports: [
        TabsPageModule,
        FormsModule,
        ComponentsModule,
        RecortarImagenPageModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        ImageCropperModule,
        IonicModule.forRoot(),
        AppRoutingModule,  
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        ServiceWorkerModule.register("combined-sw.js", { enabled: environment.production })  
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GooglePlus,
        Media,
        FCM,
        NativeAudio,
        Crop,
        Deeplinks,
        Camera,
        ImagePicker,
        AngularFirestore,
        FileChooser,
        FileTransfer,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
