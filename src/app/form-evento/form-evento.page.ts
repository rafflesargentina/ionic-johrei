import { ActivatedRoute, Router } from "@angular/router"
import { Component, OnInit, Input } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AlertController, NavController } from "@ionic/angular"

import { AuthService } from "../Services/authentication/auth.service"
import { Evento } from "../models/evento"
import { EventoService } from "../Services/evento.service"
import { ParametroService } from "../Services/global/parametro.service"
import { ToastService } from "../Services/toast.service"

@Component({
    selector: "app-form-evento",
    templateUrl: "./form-evento.page.html",
    styleUrls: ["./form-evento.page.scss"],
})

export class FormEventoPage implements OnInit {
  @Input() dismissFirstModal;
  
  public datosForm: FormGroup;
  public evento: Evento;
  public foto ="";
  public isEditando = false;
  public isSaved = true;
  public submitted = false;
  public titulo = "Nuevo Evento";

  constructor(
    private alertController: AlertController,
    private authService:AuthService,
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private parametroService: ParametroService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
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

  ngOnInit():void {
    return
  }

  ionViewDidEnter(){  
      if(this.parametroService.param.evento) {
          this.isEditando = true
          console.log("parametros", this.parametroService.param)
          this.evento = this.parametroService.param.evento
          this.datosForm.patchValue(this.parametroService.param.evento)
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
          this.eventoService.updateOne(id, {}, this.datosForm.value).subscribe((resp:any) =>{
              if(this.foto){
                  this.eventoService.uploadImagen(id,this.foto)
              }

              this.toastService.mensaje("Eventos", "Evento actualizado")

              this.navCtrl.back()
          })
      }else{      
          this.eventoService.createOne({}, this.datosForm.value).subscribe((resp:any) =>{
              this.isEditando = true 

              const eventoId = resp.data[0].id

              if(this.foto){
                  this.eventoService.uploadImagen(eventoId,this.foto)
              }

              this.toastService.mensaje("Eventos", "Evento registrado")

              this.navCtrl.back()
          })
      }   

      this.parametroService.param = ""
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
      this.eventoService.deleteOne(id).subscribe(()=>{
          this.navCtrl.back()
      })
  }
}
