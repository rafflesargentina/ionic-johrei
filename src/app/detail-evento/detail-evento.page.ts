import { Component, Input, OnInit } from "@angular/core"
import { Evento } from "../models/evento"
import { ModalController } from "@ionic/angular"

@Component({
    selector: "app-detail-evento",
    templateUrl: "./detail-evento.page.html",
    styleUrls: ["./detail-evento.page.scss"],
})

export class DetailEventoPage implements OnInit {
  @Input() evento: Evento;

  constructor(
    private modalCtrl:ModalController,
  ) {}

  ngOnInit() {}

  dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalCtrl.dismiss({
          "dismissed": true,
      })
  }
}
