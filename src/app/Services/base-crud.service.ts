import { environment } from "src/environments/environment"

import { Injectable } from "@angular/core"

import { ToastService } from "./toast.service"
import { HttpClient, HttpParams } from "@angular/common/http"
import { LoadingService } from "./loading.service"
import { tap } from "rxjs/operators"
import { LoadingController } from "@ionic/angular"


@Injectable({
    providedIn: "root"
})

export class BaseCRUDService{

  public endpoint = "";

  public url = ""; 

  public toastService:ToastService;

  public loadingService:LoadingService;

  public httpParams = new HttpParams();

  constructor(
    public httpClient:HttpClient,
  ){    
      this.url = environment.url
      const loadingCtrl = new LoadingController()
      this.loadingService = new LoadingService(loadingCtrl)
  } 

  public setEndpoint(endpoint){
      this.endpoint = endpoint   
  }  

  public getEndpoint(){
      return this.url+this.endpoint
  }
  
  public getAll(params = {page:1,perPage:5}){    
      this.loadingService.presentLoading()
      Object.keys(params).forEach((key)=> {
          this.httpParams = this.httpParams.append(key, params[key])
      }) 
      const options ={
          params: this.httpParams
      }
      return this.httpClient.get(this.getEndpoint(),options).pipe(tap(() =>{ 
          this.loadingService.dismissLoading()      
      },()=>{
          this.loadingService.dismissLoading()  
      }))
   
  }

  public getOne(id,params ={}){  
      this.loadingService.presentLoading()
      Object.keys(params).forEach((key)=> {
          this.httpParams = this.httpParams.append(key, params[key])
      }) 
      const options ={
          params: this.httpParams
      }

      return this.httpClient.get(this.getEndpoint()+"/"+id,options).pipe(tap(() =>{    
          this.loadingService.dismissLoading()      
      }, ()=>{
          this.loadingService.dismissLoading()  
      }))
  }

  public createOne(params={},body = {}){  
      this.loadingService.presentLoading()  
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 
      const options ={
          params: this.httpParams
      }
      return this.httpClient.post(this.getEndpoint(),body,options).pipe(tap(() =>{
          this.loadingService.dismissLoading()      
      }, ()=>{
          this.loadingService.dismissLoading()  
      }))
  }

  public updateOne(id, params={}, body={}){  
      this.loadingService.presentLoading()  
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 
      const options ={
          params: this.httpParams
      }
      return this.httpClient.put(this.getEndpoint() + "/" + id, body,options).pipe(tap(() =>{   
          this.loadingService.dismissLoading()      
      }, ()=>{
          this.loadingService.dismissLoading()  
      }))
  }

  public deleteOne(id, params={}, body={}){    
      this.loadingService.presentLoading()
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 
      return this.httpClient.delete(this.getEndpoint() + "/" + id, body).pipe(tap(() =>{      
          this.loadingService.dismissLoading()      
      }, ()=>{
          this.loadingService.dismissLoading()  
      }))
  }
}
