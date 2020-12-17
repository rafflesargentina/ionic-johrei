import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../Services/global/parametros.service';
import { ModalController, NavController } from '@ionic/angular';
import { FormAncestroPage } from '../form-ancestro/form-ancestro.page';
import { PlanillaAncestros } from '../models/planillaAncestros';
import { AncestrosPlanillasService } from '../Services/ancestros-planillas.service';
import { ToastService } from '../Services/toast.service';


@Component({
  selector: 'app-form-ancestros-planilla',
  templateUrl: './form-ancestros-planilla.page.html',
  styleUrls: ['./form-ancestros-planilla.page.scss'],
})
export class FormAncestrosPlanillaPage implements OnInit {

  public isAdmin = false;
  public isDisabled = true;
  public planilla:PlanillaAncestros;
  public updating = false;
  public canUpdate = true;

  constructor(
    private ancestorsPlanillaService:AncestrosPlanillasService,
    private parametrosService:ParametrosService,
    private modalCtrl:ModalController,
    private navCtrl:NavController,
    private toastService:ToastService 
  ) { }

  ngOnInit() {

    this.planilla = new PlanillaAncestros();

    //Ver si ya paso el segundo sábado del mes y setear canupdate

  }

  ionViewDidEnter(){
    
    this.planilla = new PlanillaAncestros();

    this.toastService.mensaje("Atención","Solo es posible modificar las planillas del mes en curso hasta el segundo sábado inclusive.","warning")

    if(this.parametrosService.param){
      this.updating = true;
      this.canUpdate = this.parametrosService.param.planilla.canEdit;
      this.planilla.asignarValores(this.parametrosService.param.planilla);
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
        this.planilla.ancestors[index] = retorno.data; 
      }        
    });
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
          this.planilla.ancestors.push(retorno.data); 
        }        
      });
      return await modal.present()
  } 

  eliminarAncestro(index){
    this.planilla.ancestors.splice(index,1);
  }

  guardar(){

    console.log(this.planilla)
    if(this.updating){
      this.ancestorsPlanillaService.updateOne(this.planilla.id,{},this.planilla).subscribe(data=>{
        console.log(data);
        this.navCtrl.back();
      })
    }
    else{
      console.log(this.planilla)
      this.ancestorsPlanillaService.createOne({},this.planilla).subscribe(data=>{
        console.log(data);
        this.navCtrl.back();
      })
    }
  }

  cancelar(){
    this.navCtrl.back();
  }



}
