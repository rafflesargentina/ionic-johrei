import { Component, OnInit, Input } from "@angular/core"
import { Article } from "../models/article"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ToastService } from "../Services/toast.service"
import { ParametrosService } from "../Services/global/parametros.service"
import { ModalController, NavController, AlertController } from "@ionic/angular"
import { AuthService } from "src/app/Services/authentication/auth.service"
import { LoadingService } from "../Services/loading.service"
import { NoticiasService } from "../Services/noticias.service"

@Component({
    selector: "app-form-noticias",
    templateUrl: "./form-noticias.page.html",
    styleUrls: ["./form-noticias.page.scss"],
})
export class FormNoticiasPage implements OnInit {
  @Input() dismissFirstModal;
  
  noticia: Article;
  foto ="";
  video="";
  audio="";
  archivo ="";
  datosForm: FormGroup;
  submitted = false;
  isEditing = false;
  titulo = "Nueva Noticia";
  isSaved = true;
  archivos =[];

  imagenUrl:any;
  croppedImagepath = "";
  
  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private parametrosService: ParametrosService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private noticiaService: NoticiasService,
  ) { 
      this.datosForm = this.formBuilder.group({
          id: [""],
          title:["", Validators.required],
          body: [""], 
          user_id: [this.authService.user.id, ""]
      })

      this.noticia = new Article()
    
  }

  ngOnInit():void {}

  ionViewDidEnter(){
      if(this.parametrosService.param.noticia) {
          this.isEditing = true
      
          this.noticia.asignarValores(this.parametrosService.param.noticia)

          console.log("parametros", this.noticia)

          this.datosForm.patchValue(this.parametrosService.param.noticia)
      }

      if(this.isEditing){
          this.titulo = "Editar Noticia"
      }else{
          this.titulo = "Nueva Noticia"
      }

      this.datosForm.valueChanges.subscribe(()=>{
          this.isSaved = false
          console.log("no guardado!")
      })
  }

  get f() { return this.datosForm.controls }

  videoSeleccionado(newValue : any){
      if(newValue){
          this.video = newValue
      }   
  }

  imagenSeleccionado(newValue : any){
      console.log(newValue)  
      if(newValue){
          this.foto = newValue
      }
  }

  audioSeleccionado(newValue : any){
      console.log(newValue)
      if(newValue){
          this.audio = newValue
      }
  }

  pdfSeleccionado(newValue : any){
      console.log(newValue)
      if(newValue){
          this.archivo = newValue
      }
  }

  registrar(){
      this.submitted = true     

      this.isSaved = true

      if(this.isEditing){
          const id = this.datosForm.value.id
          this.noticiaService.updateOne(id, {}, this.datosForm.value).subscribe((resp:any) =>{
              if(this.archivo){
                  this.noticiaService.uploadPDF(id,this.archivo)
              }

              if(this.video){
                  this.noticiaService.uploadVideo(id,this.video)
              }

              if(this.audio){
                  this.noticiaService.uploadAudio(id,this.audio)
              }

              if(this.foto){
                  this.noticiaService.uploadImagen(id,this.foto)
              }

              this.toastService.mensaje("Noticias", "Noticia actualizada")

              this.navCtrl.back()
          })
      } else {      
          this.noticiaService.createOne({}, this.datosForm.value).subscribe((resp:any) =>{
              this.isEditing = true

              const articuloId = resp.data[0].id

              if(this.archivo){
                  this.noticiaService.uploadPDF(articuloId,this.archivo)
              }

              if(this.video){
                  this.noticiaService.uploadVideo(articuloId,this.video)
              }

              if(this.audio){
                  this.noticiaService.uploadAudio(articuloId,this.audio)
              }

              if(this.foto){
                  this.noticiaService.uploadImagen(articuloId,this.foto)
              }

              this.toastService.mensaje("Noticias", "Noticia registrada")

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
      } else {
          this.navCtrl.back()
      }
  }

  borrarTitulo(){
      this.datosForm.controls.title.reset()
  }

  borrarContenido(){
      this.datosForm.controls.content.reset()
  }

  eliminarNoticia(){
      const id = this.datosForm.value.id
      this.noticiaService.deleteOne(id).subscribe(()=>{
          this.navCtrl.back()
      })
  }
}
