import { ActivatedRoute } from "@angular/router"
import { AlertController, ModalController, NavController } from "@ionic/angular"
import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AuthService } from "../Services/authentication/auth.service"
import { FormPasswordPage } from "../form-password/form-password.page"
import { GoogleMapsService } from "src/app/Services/google-maps.service"
import { LoadingService } from "../Services/loading.service"
import { ToastService } from "../Services/toast.service"
import { Usuario } from "../models/usuario"

@Component({
    selector: "app-form-usuario",
    templateUrl: "./form-usuario.page.html",
    styleUrls: ["./form-usuario.page.scss"],
})

export class FormUsuarioPage implements OnInit {
  public datosForm: FormGroup;

  public submitted = false;

  private usuario:Usuario;

  constructor(
    private alertController: AlertController,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private loadingService:LoadingService,
    private modalController:ModalController,
    private navCtrl:NavController,
    private route:ActivatedRoute,
    private toastService:ToastService,
    public googleMapsService:GoogleMapsService
  ) { 
      this.usuario = this.authService.user

      this.datosForm = this.formBuilder.group({
          address: this.formBuilder.group({
              country: [""],
              door_number: [""],
              floor_number: [""],
              lat: [""],
              lng: [""],
              location: [""],
              locality: ["", Validators.required],
              state: ["", Validators.required],
              street_name: [""],
              street_number: [""],
              sublocality: [""],
              zip: [""]
          }),
          contact: this.formBuilder.group({
              mobile: ["", Validators.required],
          }),
          document_number: ["", Validators.required],
          email: ["", Validators.required],      
          first_name: ["", Validators.required],
          frequenter: [null],
          last_name : ["", Validators.required],
          member: [null],
          membership: ["frequenter", Validators.required]
      })  
  }

  ngOnInit() {}

  ionViewDidEnter() {
      const usuario = this.usuario
      const address = usuario.address
      const contact = usuario.contact

      this.datosForm.patchValue({
          address: { 
              country: address.country,
              door_number: address.door_number,
              floor_number: address.floor_number,
              lat: address.lat,
              lng: address.lng,
              locality: address.locality,
              location: address.location,
              state: address.state,
              street_name: address.street_name,
              street_number: address.street_number,
              sublocality: address.sublocality,
              zip: address.zip
          },
          contact: {
              mobile: contact.mobile
          },
          document_number: this.usuario.document_number,
          email: this.usuario.email,
          first_name: this.usuario.first_name,
          frequenter: this.usuario.frequenter,
          last_name: this.usuario.last_name,
          member: this.usuario.member,
          membership: this.usuario.member ? "member" : "frequenter"
      })

      this.googleMapsService.setAddressForm(this.f.address)

      this.googleMapsService.initMap("mapDiv", {
          center: { lat: this.usuario.address.lat, lng: this.usuario.address.lng },
          zoom:15 ,
          options: {
              disableDefaultUI: true,
              scrollwheel: true,
              streetViewControl: false,
          }
      })

      this.googleMapsService.initAutocomplete("autocomplete")
  }

  get f() { return this.datosForm.controls }

  get addressControls() {
      return this.datosForm.get("address")["controls"]
  }

  get contactControls() {
      return this.datosForm.get("contact")["controls"]
  }

  guardar(){
      this.submitted = true

      if (this.datosForm.invalid) {
          return this.toastService.mensaje("Atención", "Por favor completar todos los campos solicitados", "danger")
      }

      this.authService.updateAccount(this.datosForm.value).subscribe(()=>{
          this.submitted = false

          this.toastService.mensaje("Mis Datos", "Tus datos fueron actualizados.")
      })
  }

  switchMembership (value) {
      if (value === "member"){
          this.datosForm.patchValue({
              member: true,
              frequenter: false
          })
      } else {
          this.datosForm.patchValue({
              frequenter: true,
              member: false
          })
      }
  }

  async cambiarPassword() {
      const modal = await this.modalController.create({
          component: FormPasswordPage,
          componentProps: {
              "usuario": this.usuario,
          }
      })

      return await modal.present()
  }
}
