import { Component, OnInit, ViewChild } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { IonInfiniteScroll, NavController } from "@ionic/angular"

import values from "lodash"

import { AuthService } from "src/app/Services/authentication/auth.service"
import { ParametroService } from "../Services/global/parametro.service"
import { NotificacionesAppService } from "../Services/notificaciones-app.service"
import { PlanillaService } from "../Services/planilla.service"

@Component({
    selector: "app-tab4",
    templateUrl: "./tab4.page.html",
    styleUrls: ["./tab4.page.scss"],
})

export class Tab4Page implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
    public notificaciones = [];
    public page = 1; 

    public isAdmin = false;
    public isDisabled = true;
    public items = [];
    private listing="mine";
  
    constructor(
      private navCtrl:NavController,
      private authService:AuthService,
      private notificacionesService:NotificacionesAppService,
      private router:Router,
    ) {

        this.isAdmin = this.authService.isAdmin()
        if(this.isAdmin){
            this.listing = "all"
        }
        else{
            this.listing = "mine"
        }
  
        // Subscribe to router events.
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes("tabs/tab4")) {
                    this.items = []
                    this.ionViewDidEnter()
                }    
            }
        })	

    }
  
    ngOnInit() {}
  
    ionViewDidEnter() {
        this.page = 1
        this.notificaciones = []
        this.getNotificaciones()
    }
  
    getNotificaciones(){
        const perPage = 10 
          
        const param = {
            page:this.page,
            perPage:perPage
        }
      
        const sub = this.notificacionesService.getAll(param).subscribe(data =>{
            sub.unsubscribe()
            const resp:any = data
          
            const items = resp.data.data
  
            if(items) {
                items.forEach(element => {
                    this.definirTipo(element)
                    this.notificaciones.push(element)        
                })
            }
  
            this.infiniteScroll.complete()
            this.infiniteScroll.disabled = false
  
            if (items.length < perPage) {        
                this.infiniteScroll.disabled = true
            }
        })
  
        const flag = this.notificacionesService.markAsRead().subscribe(()=> {
            flag.unsubscribe()
        })
    }
  
    definirTipo(notificacion){
        const strings = notificacion.type.split("\\")
      
        notificacion.tipo=strings[strings.length -1]
  
        console.log(notificacion.tipo)
    }
  
    title(data) {
        return data.title
    }
  
    avatar(data) {
        if (data.comment) {
            return data.comment.sender.avatar.small
        }
  
        if (data.task) {
            return data.task.user.avatar.small
        }
  
        return null
    }
  
    body(data) {
        if (data.comment) {
            return data.comment.body
        }
  
        if (data.message) {
            return data.message.body
        }
  
        return null
    }
  
    sender(data) {
        if (data.comment) {
            return data.comment.sender
        }
  
        if (data.message) {
            return data.message.sender
        }
  
        return null
    }
  
    task(data) {
        if (data.task) {
            return data.task
        }
  
        return null
    }
  
    verMas(){
        this.page++
        this.getNotificaciones()
    }
  
    cancelar(){
        this.navCtrl.back()
    }
  
    eliminar(item) {
        const subs = this.notificacionesService.deleteOne(item.id).subscribe(()=> {
            this.ionViewDidEnter()
  
            subs.unsubscribe()
        })
    }
    
    doRefresh(event){
        this.ionViewDidEnter()
        setTimeout(() => {
            event.target.complete()
        }, 500)
    }

}
