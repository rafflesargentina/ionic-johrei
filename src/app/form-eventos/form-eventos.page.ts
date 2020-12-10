import { ActivatedRoute, Router } from "@angular/router"
import { Component, OnInit, Input } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ModalController, AlertController, NavController } from "@ionic/angular"

import { Evento } from "../models/evento"
import { EventosService } from "../Services/eventos.service"
import { ToastService } from "../Services/toast.service"
import { LoadingService } from "../Services/loading.service"
import { ParametrosService } from "../Services/global/parametros.service"
import { AuthService } from "../Services/authentication/auth.service"

@Component({
    selector: "app-form-eventos",
    templateUrl: "./form-eventos.page.html",
    styleUrls: ["./form-eventos.page.scss"],
})

export class FormEventosPage implements OnInit {
  @Input() dismissFirstModal;
  
  public datosForm: FormGroup;
  public evento: Evento;
  public foto ="";
  public isEditando = false;
  public isSaved = true;
  public submitted = false;
  public titulo = "Nuevo Evento";

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private parametrosService: ParametrosService,
    private navCtrl: NavController,
  ) {
      this.datosForm = this.formBuilder.group({
          id : ["", null],
          user_id:[this.authService.user.id, null],
          title: ["", Validators.required],
          comment:["",null],
          duration:["",Validators.required],
          date: ["", Validators.required],     
          hour: ["", Validators.required],
      })

      this.evento = new Evento()
  }

  ngOnInit():void {}

  ionViewDidEnter(){  
      if(this.parametrosService.param.evento) {
          this.isEditando = true
          console.log("parametros", this.parametrosService.param)
          this.evento = this.parametrosService.param.evento
          this.datosForm.patchValue(this.parametrosService.param.evento)
      }
 
      if (this.isEditando){
          this.titulo = "Editar Evento"
      } else {
          this.titulo = "Nuevo Evento"
      }

      this.datosForm.valueChanges.subscribe(()=>{
          this.isSaved = false
      })
  }

  imagenSeleccionado(newValue : any){
      console.log(newValue)  

      if(newValue){
          this.foto = newValue
      }
  }

  get f() { return this.datosForm.controls }

  registrar(){
      this.submitted = true

      this.isSaved = true

      if(this.isEditando){
          const id = this.datosForm.value.id
          this.eventosService.updateOne(id, {}, this.datosForm.value).subscribe((resp:any) =>{
              if(this.foto){
                  this.eventosService.uploadImagen(id,this.foto)
              }

              this.toastService.mensaje("Eventos", "Evento actualizado")

              this.navCtrl.back()
          })
      }else{      
          this.eventosService.createOne({}, this.datosForm.value).subscribe((resp:any) =>{
              this.isEditando = true 

              const eventoId = resp.data[0].id

              if(this.foto){
                  this.eventosService.uploadImagen(eventoId,this.foto)
              }

              this.toastService.mensaje("Eventos", "Evento registrado")

              this.navCtrl.back()
          })
      }   

      this.parametrosService.param = ""
  }

  async clickIcono($event){
      console.log(this.isSaved)
      if(!this.isSaved){
          const alert = await this.alertController.create({
              header: "Guardar",
              message: "Desea guardar los cambios antes de salir?",
              buttons: [
                  {
                      text: "No",
                      role: "cancel",
                      cssClass: "secondary",
                      handler: ()=> {
                          this.navCtrl.back()
                      }
                  }, {
                      text: "Si",
                      handler: ()=> { 
                          this.registrar()
                          this.navCtrl.back()
                      }
                  }
              ]
          })
          await alert.present()
      }else{
          this.navCtrl.back()
      }
  }

  borrarTitulo(){
      this.datosForm.controls.title.reset()
  }

  borrarMensaje(){
      this.datosForm.controls.message.reset()
  }

  eliminarEvento(){
      const id = this.datosForm.value.id
      this.eventosService.deleteOne(id).subscribe(()=>{
          this.navCtrl.back()
      })
  }
}
