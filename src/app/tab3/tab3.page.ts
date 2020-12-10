import { Component, OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { NavigationEnd, Router } from "@angular/router"

import { Document } from "../models/document"
import { AuthService } from "src/app/Services/authentication/auth.service"
import { DocumentosService } from "../Services/documentos.service"
import { ParametrosService } from "../Services/global/parametros.service"

import values from "lodash"
import { DetailEsencialPage } from "../detail-esencial/detail-esencial.page"

@Component({
    selector: "app-tab3",
    templateUrl: "./tab3.page.html",
    styleUrls: ["./tab3.page.scss"],
})

export class Tab3Page implements OnInit {
  public isAdmin = false;
  public isDisabled = true;
  public items = [];

  private paginaActual = 0;

  constructor(
    private authService:AuthService,
    private modalCtrl:ModalController, //para manejar los modales de seleccion 
    private documentosService:DocumentosService,
    private parametrosService:ParametrosService,
    private router:Router,
  ) { 
      this.isAdmin = this.authService.isAdmin()

      // Subscribe to router events.
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
	      if (event.url.includes("tabs/tab3")) {
                  this.items = []

                  this.siguientes()
	      }    
          }
      })	
  }	

  ngOnInit():void {}

  siguientes(event?, pull = false){
      if(pull){
          this.paginaActual = 0
      }
      
      this.paginaActual++

      const params={
          page:this.paginaActual,
          perPage: 5
      }

      this.documentosService.getAll(params).subscribe((resp:any) =>{
          const data = resp.data.data
          values(data).forEach(element => {
              this.items.push(element)
          })
      
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
}
