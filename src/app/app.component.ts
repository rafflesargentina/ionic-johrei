import { Component, OnInit } from "@angular/core"
import { Platform } from "@ionic/angular"
import { Router } from "@angular/router"
import { SplashScreen } from "@ionic-native/splash-screen/ngx"
import { StatusBar } from "@ionic-native/status-bar/ngx"
import { Deeplinks } from "@ionic-native/deeplinks/ngx"
import { AuthService } from "./Services/authentication/auth.service"
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { UsuarioService } from "./Services/usuario.service"

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
    private fcm: FCM,
    private deeplinks: Deeplinks,
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

    initDeepLinks() {
        this.deeplinks.route({
            "/task": "task",
            "/route": "route"
        }).subscribe(match => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("MATCH")
            console.log(match.$route)
            console.log(match.$args.id)
            console.log(match.$link)

            if (match.$route === "app") {
                if(match.$args.id){
                    this.router.navigate(["/details-trabajo",{id:match.$args.id}])
                }
            }

            if (match.$route === "route") {
                if (match.$args.to) {
                    this.router.navigate([match.$args.to])
                }
            }

        }, nomatch => {
            // nomatch.$link - the full link data
            // console.error('Got a deeplink that didn\'t match', nomatch);
            console.log(nomatch)
        })
    }

    initializeApp() {
        this.platform.ready().then(() => {     
            this.statusBar.styleDefault()
            this.splashScreen.hide()

            if (this.authService.isAuthenticated()) {
                this.router.navigate(["/tabs/tab1"])
    
                this.fcm.requestPushPermission()
                this.fcm.getInitialPushPayload()

                this.fcm.subscribeToTopic("marketing")
        
                this.fcm.onTokenRefresh().subscribe(token => {
                    this.authService.updateFCMToken(token).subscribe()
                },error=>{
                    console.log(error)
                })
    
                // Subscribing to new notifications.
                this.fcm.onNotification().subscribe(data => {
                    if(data.wasTapped){
                        alert(data.body)
                    } else {
                        console.log(data)
                        alert(data.body)
                    }
                })
    
                this.fcm.getToken().then(token => {
                    this.authService.updateFCMToken(token).subscribe()
                },error=>{
                    console.log(error)
                })
            } else{
                this.router.navigate(["/login"])
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

    verPreguntas(){
        this.router.navigate(["list-faq"])  
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
