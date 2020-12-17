import { Component, OnInit } from '@angular/core';
import { AncestorsService } from '../Services/ancestors.service';

import { ParametrosService } from '../Services/global/parametros.service';
import { ModalController, NavController } from '@ionic/angular';
import { FormAncestroPage } from '../form-ancestro/form-ancestro.page';
import { PlanillaAncestros } from '../models/planillaAncestros';


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
    private ancestorsService:AncestorsService,
    private parametrosService:ParametrosService,
    private modalCtrl:ModalController,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    this.planilla = new PlanillaAncestros();

    if(this.parametrosService.param && this.parametrosService.param.planilla){
      this.updating = true;
      this.planilla.asignarValores(this.parametrosService.param.planilla.ancestors);
    }

    //Ver si ya paso el segundo sábado del mes y setear canupdate

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
    if(this.updating){
      this.ancestorsService.updateOne(this.planilla).subscribe(data=>{
        console.log(data);
        this.navCtrl.back();
      })
    }
    else{
      this.ancestorsService.createOne(this.planilla).subscribe(data=>{
        console.log(data);
        this.navCtrl.back();
      })
    }
  }

  cancelar(){
    this.navCtrl.back();
  }



}
