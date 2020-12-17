import { Component, OnInit } from "@angular/core"
import { Platform } from "@ionic/angular"
import { Router } from "@angular/router"
import { SplashScreen } from "@ionic-native/splash-screen/ngx"
import { StatusBar } from "@ionic-native/status-bar/ngx"

import { AuthService } from "./Services/authentication/auth.service"

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit {
    constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private router: Router,
    ) {
        this.initializeApp()    
    }

    get isAdmin() {
        return this.authService.isAdmin()
    }

    get isAuthenticated() {
        return this.authService.isAuthenticated()
    }

    get user() {
        return this.authService.user
    }

    initializeApp() {
        this.platform.ready().then(() => {     
            this.statusBar.styleDefault()
            this.splashScreen.hide()
        })


        if (this.authService.isAuthenticated()) {
            this.router.navigate(["/tabs/tab1"])
        } else{
            this.router.navigate(["/login"])
        } 
    }

    ngOnInit():void {}

    cerrarSesion(){
        this.authService.logout()
    }

    cargarNoticia(){
        this.router.navigate(["form-noticias"]) 
    }

    cargarEventos(){
        this.router.navigate(["form-eventos"]) 
    }

    editarUsuario(){
        this.router.navigate(["form-usuario"]) 
    }

    verAncestros(){
        this.router.navigate(["list-ancestors"])  
    }

    login() {
        this.router.navigate(["login"])
    }

    recoverPassword() {
        this.router.navigate(["recuperar-contrasena"])
    }

    register() {
        this.router.navigate(["form-registro"])
    }
}
