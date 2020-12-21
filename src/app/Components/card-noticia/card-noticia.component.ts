import { Component, Input, OnInit } from "@angular/core"
import { Router } from "@angular/router"

import { NoticiaService } from "../../Services/noticia.service"
import { ParametroService } from "src/app/Services/global/parametro.service"

import { Article } from "../../models/article"
import { AuthService } from "src/app/Services/authentication/auth.service"

@Component({
    selector: "app-noticia",
    templateUrl: "./card-noticia.component.html",
    styleUrls: ["./card-noticia.component.scss"],
})

export class CardNoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;

  public isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private noticiaService: NoticiaService,
    private parametroService: ParametroService,
    private router: Router
  ) { 
      this.isAdmin = this.authService.isAdmin()
  }

  ngOnInit():void {
      return
  }

  editarNoticia(){
      this.parametroService.param = {noticia: this.noticia}
      this.router.navigate(["form-noticias"])  
  }
}
