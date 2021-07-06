import { Component, OnInit, ViewChild } from "@angular/core"
import { IonInfiniteScroll, NavController } from "@ionic/angular";
import { AuthService } from "../Services/authentication/auth.service"
import { NotificacionesAppService } from "../Services/notificaciones-app.service";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.page.html",
    styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
    public notificaciones = [];
    public page = 1; 
  
    constructor(
      private navCtrl:NavController,
      private notificacionesService:NotificacionesAppService
    ) {}
  
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
      
     /*   const sub = this.notificacionesService.getAll(param).subscribe(data =>{
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
        })*/
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
