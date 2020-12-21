import { Component, OnInit } from "@angular/core"
import { Platform } from "@ionic/angular"
import { Router } from "@angular/router"
import { SplashScreen } from "@ionic-native/splash-screen/ngx"
import { StatusBar } from "@ionic-native/status-bar/ngx"
import { AuthService } from "./Services/authentication/auth.service"
import { FCM } from "@ionic-native/fcm/ngx"
import { ToastService } from "./Services/toast.service"

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit {
    constructor(
        private authService:AuthService,
        private fcm: FCM,
        private platform: Platform,
        private splashScreen: SplashScreen,       
        private router: Router, 
        private statusBar: StatusBar,
        private toastService:ToastService   
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

        this.fcm.subscribeToTopic("publico")

        this.fcm.getToken().then(token => {  
            console.log(token)   
            this.authService.updateFCMToken(token).subscribe(data =>{
                console.log(data)
            })
        },error=>{
            console.log(error)
        })

        this.fcm.onTokenRefresh().subscribe(token => {    
            console.log(token)     
            this.authService.updateFCMToken(token).subscribe(data =>{
                console.log(data)
            })
        },error=>{
            console.log(error)
        })   
        
        this.fcm.onNotification().subscribe(data => {
            if(data.wasTapped){
                this.toastService.mensaje(data.title,data.body);
                console.log("wasTapped")
            } else {
                console.log("NowasTapped")
                this.toastService.mensaje(data.title,data.body);
            }
        })
    }

    ngOnInit():void {}

    cerrarSesion(){
        this.authService.logout()
    }

    cargarNoticia(){
        this.router.navigate(["form-noticia"]) 
    }

    cargarEventos(){
        this.router.navigate(["form-evento"]) 
    }

    editarUsuario(){
        this.router.navigate(["form-usuario"]) 
    }

    verMisAncestros(){
        this.router.navigate(["list-mis-ancestros"])  
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
