import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"
import { DetailEventoPage } from "src/app/detail-evento/detail-evento.page"
import { Evento } from "src/app/models/evento"
import { EventoService } from "src/app/Services/evento.service"
import { ParametroService } from "src/app/Services/global/parametro.service"

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
    private eventoService:EventoService,
    private modalCtrl: ModalController,
    private parametroService: ParametroService,
    private router: Router
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
      this.parametroService.param = {evento: this.data}
      this.router.navigate(["form-evento"])
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
