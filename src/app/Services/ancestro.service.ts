import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { tap } from "rxjs/operators"

import { BaseCRUDService } from "./base-crud.service"

@Injectable({
    providedIn: "root"
})
export class AncestroService extends BaseCRUDService {
    constructor(
    public httpClient:HttpClient
    ) {
        super(httpClient)
        this.setEndpoint("ancestors")
    }

    public updateOrder(data){
       // let body = [{ancestor_id:id, order:order},{ancestor_id:id, order:order}]

        return this.httpClient.post(this.getEndpoint()+"/updateOrder",data).pipe(tap(() =>{    
            this.loadingService.dismissLoading()      
        }, ()=>{
            this.loadingService.dismissLoading()  
        }))
    }
}
