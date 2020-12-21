import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { BaseCRUDService } from "./base-crud.service"

@Injectable({
    providedIn: "root"
})

export class NoticiaService extends BaseCRUDService {
    constructor(
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
}
