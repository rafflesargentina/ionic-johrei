import { BehaviorSubject } from "rxjs"
import { FileTransfer } from "@ionic-native/file-transfer/ngx"
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { Article } from "src/app/models/article"
import { BaseCRUDService } from "./base-crud.service"

@Injectable({
    providedIn: "root"
})

export class NoticiasService extends BaseCRUDService {
  noticia: Article = new Article();
  noticias: Article[] = [];

  public progressSubject = new BehaviorSubject <any>(0);

  constructor(
    public transfer: FileTransfer,
    public httpClient:HttpClient
  ) {     
      super(httpClient)

      this.setEndpoint("articles")
  }

  uploadAudio(article_id,file) {
    
      const formData = new FormData() 
      formData.append("article_id", article_id)
      formData.append("location", file, file.name)
      return this.createOne(this.getEndpoint()+"/audios",formData)

  }
  
  uploadVideo(article_id,file) {      
  
      const formData = new FormData() 
      formData.append("article_id", article_id)
      formData.append("location", file, file.name)
      return this.createOne(this.getEndpoint()+"/videos",formData)
   
  }

  uploadPDF(article_id,file) {

      const formData = new FormData() 
      formData.append("article_id", article_id)
      formData.append("location", file, file.name)
      return this.createOne(this.getEndpoint()+"/documents",formData)
   
  }

  uploadImagen(article_id,file) {
    
      const formData = new FormData() 
      formData.append("photoable_id", article_id)
      formData.append("photoable_type", "articles")
      formData.append("location", file, file.name)
      return this.createOne(this.getEndpoint()+"/photos",formData)
    
  }

  updateNoticia(item){
      return this.updateOne({},item)
  }

  createNoticia(item){
      return this.createOne({},item)
  }
}
