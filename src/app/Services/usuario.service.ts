import { Injectable } from "@angular/core"

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
