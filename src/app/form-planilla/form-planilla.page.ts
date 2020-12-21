import { Component, OnInit } from "@angular/core"
import { ModalController, NavController } from "@ionic/angular"

import { FormAncestroPage } from "../form-ancestro/form-ancestro.page"
import { ParametroService } from "../Services/global/parametro.service"
import { PlanillaAncestros } from "../models/planillaAncestros"
import { PlanillaService } from "../Services/planilla.service"
import { ToastService } from "../Services/toast.service"

@Component({
    selector: "app-form-planilla",
    templateUrl: "./form-planilla.page.html",
    styleUrls: ["./form-planilla.page.scss"],
})

export class FormPlanillaPage implements OnInit {

  public canUpdate = true;
  public isAdmin = false;
  public isDisabled = true;
  public planilla:PlanillaAncestros;
  public titulo = "Nueva Planilla"
  public updating = false;

  constructor(
    private modalCtrl:ModalController,
    private navCtrl:NavController,
    private planillaService:PlanillaService,
    private parametroService:ParametroService,
    private toastService:ToastService 
  ) {}

  ngOnInit():void {
      this.planilla = new PlanillaAncestros()

      return
  }

  ionViewDidEnter(){
    
      this.planilla = new PlanillaAncestros()

      this.toastService.mensaje("Atención","Solo es posible modificar las planillas del mes en curso hasta el segundo sábado inclusive.","warning")

      if(this.parametroService.param){
          this.titulo = "Editar Planilla"
          this.updating = true
          this.canUpdate = this.parametroService.param.planilla.canEdit
          this.planilla.asignarValores(this.parametroService.param.planilla)
          console.log(this.planilla)
      }
      else{

      }
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
                  this.planilla.ancestors[index] = retorno.data 
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
                  this.planilla.ancestors.push(retorno.data) 
              }        
          })
      return await modal.present()
  } 

  eliminarAncestro(index){
      this.planilla.ancestors.splice(index,1)
  }

  guardar(){

      console.log(this.planilla)
      if(this.updating){
          this.planillaService.updateOne(this.planilla.id,{},this.planilla).subscribe(data=>{
              console.log(data)
              this.navCtrl.back()
          })
      }
      else{
          console.log(this.planilla)
          this.planillaService.createOne({},this.planilla).subscribe(data=>{
              console.log(data)
              this.navCtrl.back()
          })
      }
  }

  cancelar(){
      this.navCtrl.back()
  }
}
