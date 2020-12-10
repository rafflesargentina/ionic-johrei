import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { DetailEventoPage } from "./detail-evento.page"

const routes: Routes = [
    {
        path: "",
        component: DetailEventoPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailEventoPageRoutingModule {}
