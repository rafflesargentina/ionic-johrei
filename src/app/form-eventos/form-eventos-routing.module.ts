import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormEventosPage } from "./form-eventos.page"

const routes: Routes = [
    {
        path: "",
        component: FormEventosPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormEventosPageRoutingModule {}
