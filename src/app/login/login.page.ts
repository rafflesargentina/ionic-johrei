import { AlertController } from "@ionic/angular"
import { ActivatedRoute, Router } from "@angular/router"
import { Component, ViewChild } from "@angular/core"

import { AuthService } from "../Services/authentication/auth.service"

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})

export class LoginPage {
  // Importar el ViewChild para acceder a un elemento del DOM
  @ViewChild("passwordEye") passwordEye;

  public email:string;
  public iconpassword = "eye-off";
  public password:string;
  public passwordTypeInput = "password";
  public submitted = false;

  constructor(
    private alertController: AlertController,
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router,
  ) {}

  login() {
      this.submitted = true

      let intended = ""
      const params = this.route.snapshot.params

      if (params.intended) {
          intended = params.intended
      } else {
          intended = JSON.stringify(["/tabs/tab1"])
      }

      return this.authService.login({ email: this.email, password: this.password }, intended).subscribe(()=> {
          this.submitted = false
      }, ()=> {
          this.submitted = false
      })
  }

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, 
  //además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode():void {
      this.passwordTypeInput = this.passwordTypeInput === "text" ? "password" : "text"
      this.iconpassword = this.iconpassword === "eye-off" ? "eye" : "eye-off"
      this.passwordEye.el.setFocus()
  }
}
