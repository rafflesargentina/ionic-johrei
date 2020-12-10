import { Component, OnInit, Input } from "@angular/core"
import { Article } from "../../models/article"
import { ActionSheetController, Platform } from "@ionic/angular"
import { NoticiasService } from "../../Services/noticias.service"
import { ParametrosService } from "src/app/Services/global/parametros.service"
import { Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"

@Component({
    selector: "app-noticia",
    templateUrl: "./card-noticia.component.html",
    styleUrls: ["./card-noticia.component.scss"],
})

export class CardNoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;

  public audio = new Audio();
  public isAdmin: boolean;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private noticiasservice: NoticiasService,
    private parametrosService: ParametrosService,
    private router: Router,
    private platform: Platform,
    private authService: AuthService
  ) { 
      this.isAdmin = this.authService.isAdmin()
  }

  ngOnInit():void {}

  editarNoticia(){
      this.parametrosService.param = {noticia: this.noticia}
      this.router.navigate(["form-noticias"])  
  }

  reproducir(){
      //this.audio.src = this.noticia.urlToSound;
      //this.audio.load();
      //this.audio.play();
  }

  detener(){
      //this.audio.pause();
  }
}
