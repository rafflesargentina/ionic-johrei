import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"

import { Article } from "../models/article"
import { AuthService } from "src/app/Services/authentication/auth.service"
import { NoticiaService } from "../Services/noticia.service"
import { ParametroService } from "../Services/global/parametro.service"

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
    private noticiaService:NoticiaService,
    private parametroService:ParametroService,
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

      this.noticiaService.getAll(params).subscribe((resp:any) =>{
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
      this.parametroService.param = {noticia: null} //esto está así para que no cargue la última noticia editada.
      this.router.navigate(["/form-noticia"])
  }

  recargar(event){
      this.siguientes(event, true)
      this.isDisabled = true
      this.items = []
  }
}
