import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormEventoPage } from "./form-evento.page"

const routes: Routes = [
    {
        path: "",
        component: FormEventoPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormEventoPageRoutingModule {}
