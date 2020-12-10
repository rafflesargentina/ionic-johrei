import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { ToastController } from "@ionic/angular"
import { AuthService } from "../Services/authentication/auth.service"

@Component({
    selector: "app-recuperar-contrasena",
    templateUrl: "./recuperar-contrasena.page.html",
    styleUrls: ["./recuperar-contrasena.page.scss"],
})
export class RecuperarContrasenaPage implements OnInit {

  public datosForm: FormGroup;
  public submitted = false;

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastCtrl:ToastController,
  ) {
      this.datosForm = this.formBuilder.group({
          email: ["", Validators.required], 
      })
  }

  ngOnInit() {}

  get f() { return this.datosForm.controls }

  recuperar() {
      this.submitted = true

      this.authService.requestPasswordReset(this.datosForm.value).subscribe()
  }

  async presentToast(mensaje: string) {
      const toast = await this.toastCtrl.create({
          message: mensaje,
          color: "danger",
          duration: 3000
      })
      toast.present()
  }

}
