import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { tap } from "rxjs/operators"
import { BaseCRUDService } from "./base-crud.service"

@Injectable({
    providedIn: "root"
})

export class UsuarioService extends BaseCRUDService {
    constructor(
    public httpClient:HttpClient
    ) {
        super(httpClient)
        this.setEndpoint("users")
    }

    
}
