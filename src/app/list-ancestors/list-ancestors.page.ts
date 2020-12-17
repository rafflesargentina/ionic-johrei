import { Component, OnInit } from '@angular/core';
import { AncestorsService } from '../Services/ancestors.service';

import values from "lodash"
import { NavigationEnd, Router } from '@angular/router';
import { ParametrosService } from '../Services/global/parametros.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-ancestors',
  templateUrl: './list-ancestors.page.html',
  styleUrls: ['./list-ancestors.page.scss'],
})
export class ListAncestorsPage implements OnInit {

  public isAdmin = false;
  public isDisabled = true;
  public items = [];

  private paginaActual = 0;

  constructor(
    private ancestorsService:AncestorsService,
    private router:Router,
    private parametrosService:ParametrosService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
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

  siguientes(event?, pull = false){
    if(pull){
        this.paginaActual = 0
    }
    this.paginaActual++

    const params={
        page:this.paginaActual,
        perPage: 5
    }

    this.ancestorsService.getAll(params).subscribe( (resp:any) =>{
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

  async agregar(){
    //this.parametrosService.param = {noticia: null} //esto está así para que no cargue la última noticia editada.
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar Ancestro',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'relationship',
          type: 'text',
          placeholder: 'Relación'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            let params = {
              name:data.name,
              relationship: data.relationship
            }
            this.ancestorsService.createOne().subscribe(data=>{
              console.log(data);
              this.siguientes(undefined,true);
            })
          }
        }
      ]
    });

    await alert.present();
  }
  

}
