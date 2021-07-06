import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"
import { Evento } from "../models/evento"
import { EventoService } from "../Services/evento.service"
import { ParametroService } from "../Services/global/parametro.service"

import values from "lodash/values"
import { DocumentoService } from "../Services/documento.service"
import { ModalController } from "@ionic/angular"
import { DetailEsencialPage } from "../detail-esencial/detail-esencial.page"

@Component({
    selector: "app-tab2",
    templateUrl: "./tab2.page.html",
    styleUrls: ["./tab2.page.scss"],
})

export class Tab2Page implements OnInit {
    public isAdmin = false;
    public isDisabled = true;
    public items = [];
  
    private paginaActual = 0;
  
    public isMenuOpen = [];
  
    constructor(
      private authService:AuthService,
      private documentoService:DocumentoService,
      private modalCtrl:ModalController, //para manejar los modales de seleccion 
      private parametroService:ParametroService,
      private router:Router
    ) { 
        this.isAdmin = this.authService.isAdmin()
  
        // Subscribe to router events.
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes("tabs/tab2")) {
                    this.items = []
                    this.siguientes()
                }    
            }
        })	
    }	
  
    ngOnInit():void {
        return
    }
  
    siguientes(event?, pull = false){
        if(pull){
            this.paginaActual = 0
        }
        
        this.paginaActual++
  
        const params={
            page:this.paginaActual,
            perPage: 5
        }
  
        this.documentoService.getAll(params).subscribe((resp:any) =>{
            const data = resp.data.data
            let index = 0;
            values(data).forEach(element => {
              this.isMenuOpen[index] = false;
              index++;
              this.items.push(element)
            })
        
            console.log(this.isMenuOpen)
            if(event){
                event.target.complete()
                if(resp.length === 0){
                    this.isDisabled = false
                }
            }
        })
    }
  
    async verDetalles(item){
        const modal = await this.modalCtrl.create({
            component: DetailEsencialPage,
            componentProps: {
                "esencial": item, 
            }
        })
        return await modal.present()
    }
  
    recargar(event){
        this.siguientes(event, true)
        this.isDisabled = true
        this.items = []
    }
  
    toggle(index){
        this.isMenuOpen[index] = !this.isMenuOpen[index];
        console.log(index)
        console.log(this.isMenuOpen[index])
    }
  

}
