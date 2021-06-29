import { Component, OnInit, ViewChild } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { IonReorderGroup, ModalController } from "@ionic/angular"

import { AuthService } from "../Services/authentication/auth.service"
import { AncestroService } from "../Services/ancestro.service"
import { FormAncestroPage } from "../form-ancestro/form-ancestro.page"
import { ItemReorderEventDetail } from '@ionic/core';
import values from "lodash"

@Component({
    selector: "app-list-mis-ancestros",
    templateUrl: "./list-mis-ancestros.page.html",
    styleUrls: ["./list-mis-ancestros.page.scss"],
})

export class ListMisAncestrosPage implements OnInit {

  public canUpdate = true;
  public isAdmin = false;
  public isDisabled = true;
  public items = [];
  public updating = false;

  private paginaActual = 0;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  constructor(
    private ancestroService:AncestroService,
    private authService:AuthService,
    private modalCtrl:ModalController,
    private router:Router
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

      this.ancestroService.getAll(params).subscribe((resp:any) =>{
          const data = resp.data.data
          this.items = [];
          values(data).forEach((element,index) => {
              element.order = index;
              this.items.push(element)
          })
          console.log(this.items)
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
                  this.ancestroService.updateOne(retorno.data.id,{},retorno.data).subscribe(data=>{
                    this.recargar(undefined)
                  })
                  
              }    
              else{
                this.recargar(undefined)
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
                  this.ancestroService.createOne({},retorno.data).subscribe(data=>{
                      this.recargar(undefined)
                  })
              }        
          })
      return await modal.present()
  } 

  eliminar(item){
      this.ancestroService.deleteOne(item.id,item).subscribe(data=>{
          this.recargar(undefined)
      })
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    this.items.splice(ev.detail.to, 0, this.items.splice(ev.detail.from, 1)[0]);
    console.log(this.items)
    let ordenes =[];

    for(let i = 0; i< this.items.length; i++){              
        ordenes.push({
            id:this.items[i].id,
            order:i
        })
    }
   

    this.ancestroService.updateOrder(ordenes).subscribe(data=>{
        console.log(data)
    })

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
}
