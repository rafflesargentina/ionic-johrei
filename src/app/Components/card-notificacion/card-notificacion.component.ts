import { Component, Input, OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { Router } from "@angular/router"

@Component({
    selector: "app-card-notificacion",
    styleUrls: ["./card-notificacion.component.scss"],
    templateUrl: "./card-notificacion.component.html"
})

export class CardNotificacionComponent implements OnInit {

  @Input() item:any;

  public defaultAvatar = "/assets/icon/logo.svg"

  constructor(
    private modalController:ModalController,
    private router:Router,
   // private navegacionParametros:NavegacionParametrosService
  ) {}

  ngOnInit() {}

  async ver(action){
      /*this.navegacionParametros.param = action.params

      if (action.type === "modal") {
          if (action.action === "FormAceptarOfertaPage") {
              const modal = await this.modalController.create({
                  component: FormAceptarOfertaPage,
                  componentProps: action.params
              })

              modal.present()
          }

          if (action.action === "FormRechazarOfertaPage") {
              const modal = await this.modalController.create({
                  component: FormRechazarOfertaPage,
                  componentProps: action.params
              })

              modal.present()
          }

          if (action.action === "FormResponderMensajePage") {
              const modal = await this.modalController.create({
                  component: FormResponderMensajePage,
                  componentProps: action.params
              })
              modal.present()
          }

          if (action.action === "FormResponderPreguntaPage") {
              const modal = await this.modalController.create({
                  component: FormResponderPreguntaPage,
                  componentProps: action.params
              })
              modal.present()
          }
      } else {
          if (action.params) {
              this.router.navigate([action.action,action.params])
          } else {
              this.router.navigate([action.action])
          }
      }*/
  }
}
