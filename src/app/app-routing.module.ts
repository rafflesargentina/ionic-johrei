import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, Routes } from "@angular/router"

import { RedirectIfAuthenticatedService } from "./Services/Guard/redirect-if-authenticated.service"
import { RedirectIfNotAuthenticatedService } from "./Services/Guard/redirect-if-not-authenticated.service"

const routes: Routes = [
    {
        path: "",
        redirectTo: "tabs",
        pathMatch: "full"
    },
    {
        path: "tab1",
        redirectTo: "tabs/tab1",
        pathMatch: "full"
    },
    {
        path: "tab2",
        redirectTo: "tabs/tab2",
        pathMatch: "full"
    },
    {
        path: "tab3",
        redirectTo: "tabs/tab3",
        pathMatch: "full"
    },
    {
        path: "tab4",
        redirectTo: "tabs/tab4",
        pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: () => import("./login/login.module").then( m => m.LoginPageModule),
        canActivate: [RedirectIfAuthenticatedService]
    },
    {
        path: "recuperar-contrasena",
        loadChildren: () => import("./recuperar-contrasena/recuperar-contrasena.module").then( m => m.RecuperarContrasenaPageModule),
        canActivate: [RedirectIfAuthenticatedService]
    },
    {
        path: "recortar-imagen",
        loadChildren: () => import("./recortar-imagen/recortar-imagen.module").then( m => m.RecortarImagenPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "form-registro",
        loadChildren: () => import("./form-registro/form-registro.module").then( m => m.FormRegistroPageModule),
        canActivate: [RedirectIfAuthenticatedService]
    },
    {
        path: "form-noticia",
        loadChildren: () => import("./form-noticia/form-noticia.module").then( m => m.FormNoticiaPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "form-evento",
        loadChildren: () => import("./form-evento/form-evento.module").then( m => m.FormEventoPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "tabs",
        loadChildren: () => import("./tabs/tabs.module").then( m => m.TabsPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "form-usuario",
        loadChildren: () => import("./form-usuario/form-usuario.module").then( m => m.FormUsuarioPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "detail-evento",
        loadChildren: () => import("./detail-evento/detail-evento.module").then( m => m.DetailEventoPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "form-password",
        loadChildren: () => import("./form-password/form-password.module").then( m => m.FormPasswordPageModule),
        canActivate: [RedirectIfNotAuthenticatedService]
    },
    {
        path: "detail-esencial",
        loadChildren: () => import("./detail-esencial/detail-esencial.module").then( m => m.DetailEsencialPageModule)
    },
    {
        path: "form-ancestro",
        loadChildren: () => import("./form-ancestro/form-ancestro.module").then( m => m.FormAncestroPageModule)
    },
    {
        path: "list-mis-ancestros",
        loadChildren: () => import("./list-mis-ancestros/list-mis-ancestros.module").then( m => m.ListMisAncestrosPageModule)
    }
]

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
