import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"
import { Evento } from "../models/evento"
import { EventoService } from "../Services/evento.service"
import { ParametroService } from "../Services/global/parametro.service"

import values from "lodash/values"

@Component({
    selector: "app-tab2",
    templateUrl: "./tab2.page.html",
    styleUrls: ["./tab2.page.scss"],
})

export class Tab2Page implements OnInit {

  public isAdmin = false;
  public isDisabled = true;
  public items:any[] = [];

  private paginaActual = 0;

  constructor(
    private authService:AuthService,
    private eventosService:EventoService,
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

      this.eventosService.getAll(params).subscribe( (resp:any) =>{
          values(resp.data.data).forEach(element => {
              
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

  recargar(event){
      this.siguientes(event, true)
      this.isDisabled = true
      this.items = []
  }

  mostrar(evento: Evento, index: number){
      if(index != 0){
          const i = index-1
          const fechaA = new Date(evento.date)
          const fechaB = new Date(this.items[i].date)
          if(fechaA.getDate() != fechaB.getDate()){
              return true
          }else{
              return false
          }
      }else{
          return true
      }
  }

  editarEvento(event: Evento){
      //console.log('mostrar editar evento', event);
      if(!this.isAdmin){
      //formulario de evento para edición
          this.parametroService.param = {evento: event}
          this.router.navigate(["/form-evento"])
      }
  }

  agregarEvento(){
      this.parametroService.param = {evento: null} //esto está así para que no cargue el último evento editado
      this.router.navigate(["/form-evento"])
  }

}
