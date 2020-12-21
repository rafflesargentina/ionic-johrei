import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { BaseCRUDService } from "./base-crud.service"

import { tap } from "rxjs/operators"

@Injectable({
    providedIn: "root"
})

export class EventoService extends BaseCRUDService {
  constructor(
    public httpClient:HttpClient,
  ) {     
      super(httpClient)
      this.setEndpoint("appointments")  
  }
  
  aceptar(appointment_id){
      this.loadingService.presentLoading()

      const options ={
          params: {}
      }

      return this.httpClient.put(this.getEndpoint() + "/" + appointment_id + "/accept", {}, options).pipe(tap(() =>{
          this.loadingService.dismissLoading()
      }, ()=>{
          this.loadingService.dismissLoading()
      }))
  }

  rechazar(appointment_id){
      this.loadingService.presentLoading()

      const options ={
          params: {}
      }

      return this.httpClient.put(this.getEndpoint() + "/" + appointment_id + "/reject", {}, options).pipe(tap(() =>{
          this.loadingService.dismissLoading()
      }, ()=>{
          this.loadingService.dismissLoading()
      }))
  }

  uploadImagen(photoable_id,file) {
      const formData = new FormData() 
      formData.append("photoable_id", photoable_id)
      formData.append("photoable_type", "appointments")
      formData.append("location", file, file.name)
      return this.createOne(this.getEndpoint()+"/photos",formData)
  }
}
