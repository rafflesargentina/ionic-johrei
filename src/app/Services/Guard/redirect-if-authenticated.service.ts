import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"

@Injectable({
    providedIn: "root"
})

export class RedirectIfAuthenticatedService implements CanActivate {
    constructor(
    private authService:AuthService,
    private router:Router
    ) {}

    canActivate():boolean {
        const auth = this.authService.isAuthenticated()

        if (auth) {
            this.router.navigate(["/tabs/tab1"])
        }
   

        return !auth
    }
}
