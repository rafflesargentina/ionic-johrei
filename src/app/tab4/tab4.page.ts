import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"

import values from "lodash"

import { AuthService } from "src/app/Services/authentication/auth.service"
import { ParametroService } from "../Services/global/parametro.service"
import { PlanillaService } from "../Services/planilla.service"

@Component({
    selector: "app-tab4",
    templateUrl: "./tab4.page.html",
    styleUrls: ["./tab4.page.scss"],
})

export class Tab4Page implements OnInit {
  public isAdmin = false;
  public isDisabled = true;
  public items = [];

  private paginaActual = 0;
  private listing="mine";

  constructor(
    private authService:AuthService,
    private parametroService:ParametroService,
    private planillaService:PlanillaService,
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
          perPage: 5,
          listing:this.listing
      }

      this.planillaService.getAll(params).subscribe((resp:any) =>{
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

  async editar(item){
      this.parametroService.param = {planilla : item}  
      this.router.navigate(["/form-planilla"])
  }

  recargar(event){
      this.siguientes(event, true)
      this.isDisabled = true
      this.items = []
  }

  agregar(){
      this.parametroService.param = undefined  
      this.router.navigate(["/form-planilla"])
  }
}
