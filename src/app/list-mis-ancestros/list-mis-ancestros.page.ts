import { Component, OnInit } from "@angular/core"
import values from "lodash"
import { AuthService } from "../Services/authentication/auth.service"
import { NavigationEnd, Router } from "@angular/router"
import { ModalController } from "@ionic/angular"
import { FormAncestroPage } from "../form-ancestro/form-ancestro.page"
import { AncestorsService } from "../Services/ancestors.service"

@Component({
    selector: "app-list-mis-ancestros",
    templateUrl: "./list-mis-ancestros.page.html",
    styleUrls: ["./list-mis-ancestros.page.scss"],
})
export class ListMisAncestrosPage implements OnInit {

  public isAdmin = false;
  public isDisabled = true;
  public items = [];
  public updating = false;
  public canUpdate = true;
  private paginaActual = 0;

  constructor(
    private ancestrosService:AncestorsService,
    private authService:AuthService,
    private router:Router,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
      this.recargar(undefined)
  }

  ionViewDidEnter(){

      this.isAdmin = this.authService.isAdmin()

      // Subscribe to router events.
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              if (event.url.includes("tabs/tab4")) {
                  this.recargar(undefined)
              }    
          }
      })	

  }

  recargar(event){
      this.siguientes(event, true)
      this.isDisabled = true
      this.items = []
  }

  siguientes(event?, pull = false){
      if(pull){
          this.paginaActual = 0
      }
    
      this.paginaActual++

      const params={
          page:this.paginaActual,
          perPage: 20
      }

      this.ancestrosService.getAll(params).subscribe((resp:any) =>{
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

  async editar(index,item){
      const modal = await this.modalCtrl.create({
          component: FormAncestroPage,
          componentProps: {
              ancestro:item
          }
      })

      modal.onDidDismiss()
          .then((retorno) => {
              console.log(retorno)
              if(retorno.data){     
                  this.ancestrosService.updateOne(retorno.data.id,{},retorno.data).subscribe(data=>{
                      this.recargar(undefined)
                  })
        
              }        
          })
      return await modal.present()
  }

  

  async agregar(){

      const modal = await this.modalCtrl.create({
          component: FormAncestroPage
      })

      modal.onDidDismiss()
          .then((retorno) => {
              console.log(retorno)
              if(retorno.data){     
                  this.ancestrosService.createOne({},retorno.data).subscribe(data=>{
                      this.recargar(undefined)
                  })
              }        
          })
      return await modal.present()
  } 

  eliminar(item){
      this.ancestrosService.deleteOne(item.id,{},item).subscribe(data=>{
          this.recargar(undefined)
      })
  }
}
