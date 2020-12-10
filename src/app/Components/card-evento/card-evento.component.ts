import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Evento } from "src/app/models/evento"
import { EventosService } from "src/app/Services/eventos.service"
import { Router } from "@angular/router"
import { ParametrosService } from "src/app/Services/global/parametros.service"
import { ModalController} from "@ionic/angular"
import { DetailEventoPage } from "src/app/detail-evento/detail-evento.page"

import { AuthService } from "src/app/Services/authentication/auth.service"

@Component({
    selector: "app-card-evento",
    templateUrl: "./card-evento.component.html",
    styleUrls: ["./card-evento.component.scss"],
})

export class CardEventoComponent implements OnInit {

  @Input() data: Evento;
  @Output() onSelect = new EventEmitter<Evento>();

  public isAccepted = false;
  public isAdmin = false;
  public isDisabled = true;
  public isRejected = false;
  public showActions = true;

  constructor(
    private authService:AuthService,
    private modalCtrl: ModalController,
    private eventoService:EventosService,
    private router: Router,
    private parametrosService: ParametrosService,
  ) { 
      this.isAdmin = this.authService.isAdmin()
  }

  ngOnInit() {
      if(!this.isAdmin) {
          if (!this.data.guests) {
              this.isAccepted = false
          } else {
              if(this.data.guests[0]) {
                  this.isAccepted = !!this.data.guests[0].pivot.accepted
                  this.isRejected = !!this.data.guests[0].pivot.rejected

                  this.showActions = !this.isAccepted&&!this.isRejected
              }
          }
      } else {
          this.showActions = false
      }
  }

  aceptar(event){
      event.stopPropagation()

      this.eventoService.aceptar(this.data.id).subscribe(response =>{
          const resp:any = response
          this.isAccepted = !!resp.accepted
          this.isRejected = !!resp.rejected

          this.showActions = false
      })    
  }

  rechazar(event){
      event.stopPropagation()

      this.eventoService.rechazar(this.data.id).subscribe(response =>{
          const resp:any = response
          this.isAccepted = !!resp.accepted
          this.isRejected = !!resp.rejected

          this.showActions = false
      })
  }

  
  editarEvento() {
      this.parametrosService.param = {evento: this.data}
      this.router.navigate(["form-eventos"])
  }

  async mostrarDetalles() {
      const modal = await this.modalCtrl.create({
          component: DetailEventoPage,
          componentProps: {
              "evento": this.data,
          }
      })
      return await modal.present()
  }
}
