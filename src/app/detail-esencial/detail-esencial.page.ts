import { Component, Input, OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"

@Component({
    selector: "app-detail-esencial",
    templateUrl: "./detail-esencial.page.html",
    styleUrls: ["./detail-esencial.page.scss"],
})

export class DetailEsencialPage implements OnInit {

  @Input() esencial:any;
  
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
