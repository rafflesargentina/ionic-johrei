import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router"

import { AuthService } from "src/app/Services/authentication/auth.service"

@Injectable({
    providedIn: "root"
})

export class RedirectIfNotAuthenticatedService implements CanActivate {
    constructor(
    private authService:AuthService,
    private router:Router
    ) {}

    canActivate(next:ActivatedRouteSnapshot):boolean {
        const auth = this.authService.isAuthenticated()

        if (!auth) {
            this.router.navigate(["login", { intended: JSON.stringify([next.url[0].path, next.url[0].parameters]) }])
        }

        return auth
    }
}
