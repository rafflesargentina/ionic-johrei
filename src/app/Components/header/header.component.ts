import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Router } from "@angular/router"
import { NavController } from "@ionic/angular"

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  @Input() titulo = "";
  @Input() icono = "";
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickIcono: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public router:Router,
    public navCtrl:NavController
  ) { 
  
  }

  ngOnInit() {}

  atras(){
      this.volver.emit()
      this.navCtrl.back()  
  }

  click(){
      this.clickIcono.emit()
  //  this.navCtrl.back();  
  }
}
