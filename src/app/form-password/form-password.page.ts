import { Component, OnInit, ViewChild } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ModalController } from "@ionic/angular"

import { AuthService } from "../Services/authentication/auth.service"

@Component({
    selector: "app-form-password",
    templateUrl: "./form-password.page.html",
    styleUrls: ["./form-password.page.scss"],
})

export class FormPasswordPage implements OnInit {
  // mostrar y ocultar la contraseña
  //se crea una propiedad por cada campo de contraseña
  // Importar el ViewChild para acceder a un elemento del DOM
  @ViewChild("passwordEyeRegister") passwordEye;
  @ViewChild("passwordNewEye") passwordNewEye;
  @ViewChild("passwordEyeConfirmation") passwordEyeConfirm;
  
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput1  =  "password";
  passwordTypeInput2  =  "password";
  passwordTypeInput3  =  "password";

  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword1  =  "eye-off";
  iconpassword2  =  "eye-off";
  iconpassword3  =  "eye-off";

  public datosForm: FormGroup;
  public isSaved = true;
  public submitted = false;

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { 
      this.datosForm = this.formBuilder.group({
          current_password:["", Validators.required], 
          password: ["", Validators.required],      
          password_confirmation:["", Validators.required],
      })  
  }

  ngOnInit():void {}

  ionViewDidEnter(){
      this.datosForm.valueChanges.subscribe(()=>{
          this.isSaved = false
      })
  }

  get f() { return this.datosForm.controls }

  guardar(){
      this.submitted = true
    
      this.authService.changePassword(this.datosForm.value).subscribe(()=>{
          this.dismiss()
      })
  }

  dismiss(){
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalCtrl.dismiss({
          "dismissed": true
      })
  }

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, 
  //además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode() {
      this.passwordTypeInput1  =  this.passwordTypeInput1  ===  "text"  ?  "password"  :  "text"
      this.iconpassword1  =  this.iconpassword1  ===  "eye-off"  ?  "eye"  :  "eye-off"
      this.passwordEye.el.setFocus()
  }

  togglePasswordConfirmMode() {
      this.passwordTypeInput2  =  this.passwordTypeInput2  ===  "text"  ?  "password"  :  "text"
      this.iconpassword2  =  this.iconpassword2  ===  "eye-off"  ?  "eye"  :  "eye-off"
      this.passwordEyeConfirm.el.setFocus()
  }

  togglePasswordNewMode() {
      this.passwordTypeInput3  =  this.passwordTypeInput3  ===  "text"  ?  "password"  :  "text"
      this.iconpassword3  =  this.iconpassword3  ===  "eye-off"  ?  "eye"  :  "eye-off"
      this.passwordNewEye.el.setFocus()
  }
}
