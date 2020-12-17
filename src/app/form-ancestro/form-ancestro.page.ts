import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Ancestro } from '../models/ancestro';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-form-ancestro',
  templateUrl: './form-ancestro.page.html',
  styleUrls: ['./form-ancestro.page.scss'],
})
export class FormAncestroPage implements OnInit {

  public ancestro:Ancestro;
  public datosForm: FormGroup;
  public titulo = "Nuevo Ancestro";
  public submitted = false;

  constructor(
    public navParams:NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl:ModalController,
    public toastService:ToastService
  ) { 
    
    this.datosForm = this.formBuilder.group({
      id : ["", null],
      name:["", Validators.required],
      relationship: ["", Validators.required],
    })

    this.ancestro = new Ancestro();

  }

  ngOnInit() {
    if(this.navParams.get("ancestro")){
      this.titulo = "Edición Ancestro";
      this.ancestro.asignarValores(this.navParams.get("ancestro"))
      this.datosForm.patchValue({name: this.ancestro.name});
      this.datosForm.patchValue({relationship:this.ancestro.relationship});
    }
  }

  get f() { return this.datosForm.controls }

  guardar(){

    this.submitted = true;

    if (this.datosForm.invalid) {
      return this.toastService.mensaje("Atención", "Por favor completar todos los campos solicitados", "danger")
    }

    this.ancestro.asignarValores(this.datosForm.value)
    this.modalCtrl.dismiss(this.ancestro);
  }

  cancelar(){
    this.modalCtrl.dismiss();
  }

}
