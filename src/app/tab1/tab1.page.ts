import { Component, OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { NavigationEnd, Router } from "@angular/router"

import { Article } from "../models/article"
import { AuthService } from "src/app/Services/authentication/auth.service"
import { NoticiasService } from "../Services/noticias.service"
import { ParametrosService } from "../Services/global/parametros.service"

import values from "lodash"

@Component({
    selector: "app-tab1",
    templateUrl: "./tab1.page.html",
    styleUrls: ["./tab1.page.scss"],
})

export class Tab1Page implements OnInit {
  public isAdmin = false;
  public isDisabled = true;
  public items = [];

  private paginaActual = 0;

  constructor(
    private authService:AuthService,
    private modalCtrl:ModalController, //para manejar los modales de seleccion 
    private noticiasService:NoticiasService,
    private parametrosService:ParametrosService,
    private router:Router,
  ) { 
      this.isAdmin = this.authService.isAdmin()

      // Subscribe to router events.
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
	      if (event.url.includes("tabs/tab1")) {
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

      this.noticiasService.getAll(params).subscribe((resp:any) =>{
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

  agregarNoticia(){
      this.parametrosService.param = {noticia: null} //esto está así para que no cargue la última noticia editada.
      this.router.navigate(["/form-noticias"])
  }

  recargar(event){
      this.siguientes(event, true)
      this.isDisabled = true
      this.items = []
  }
}
