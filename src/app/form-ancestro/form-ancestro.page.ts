import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AlertController, ModalController, NavParams } from "@ionic/angular"
import { Ancestro } from "../models/ancestro"
import { AncestroService } from "../Services/ancestro.service"
import { ToastService } from "../Services/toast.service"

@Component({
    selector: "app-form-ancestro",
    templateUrl: "./form-ancestro.page.html",
    styleUrls: ["./form-ancestro.page.scss"],
})
export class FormAncestroPage implements OnInit {

  public ancestro:Ancestro;
  public datosForm: FormGroup;
  public titulo = "Nuevo Ancestro";
  public submitted = false;
  public updating = false;

  constructor(
    public navParams:NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl:ModalController,
    public toastService:ToastService,
    private alertController:AlertController,
    public ancestroService:AncestroService
  ) { 
    this.updating = false;
      this.datosForm = this.formBuilder.group({
          id : ["", null],
          name:["", Validators.required],
          relationship: ["", Validators.required],
      })

     

  }

  ngOnInit() {
      if(this.navParams.get("ancestro")){
          this.updating = true;
          const a = this.navParams.get("ancestro")
          this.titulo = "Editar Ancestro"
          this.datosForm.patchValue({id: a.id})
          this.datosForm.patchValue({name: a.name})
          this.datosForm.patchValue({relationship:a.relationship})
          this.ancestro = new Ancestro()
          this.ancestro.asignarValores(this.navParams.get("ancestro"))
      }
  }

  get f() { return this.datosForm.controls }

  guardar(){

      this.submitted = true

      if (this.datosForm.invalid) {
          return this.toastService.mensaje("Atención", "Por favor completar todos los campos solicitados", "danger")
      }

      this.modalCtrl.dismiss(this.datosForm.value)
  }

  cancelar(){
      this.modalCtrl.dismiss()
  }

  async borrar(){
    const alert = await this.alertController.create({
        header: 'Está seguro que desea borrar el ancestro?',
        message: '',
        buttons: [
          { 
            text: 'No',
            handler: (blah) => {
              
            }
          }, {
            text: 'Si',
            handler: () => {           
                this.ancestroService.deleteOne(this.ancestro.id,this.ancestro).subscribe(data=>{
                   this.modalCtrl.dismiss();
                })      
            }
          }
        ]
      });
      await alert.present();   
  }

}
