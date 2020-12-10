import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { DetailEsencialPage } from "./detail-esencial.page"

const routes: Routes = [
    {
        path: "",
        component: DetailEsencialPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailEsencialPageRoutingModule {}
