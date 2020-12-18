import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormAncestrosPlanillaPage } from "./form-ancestros-planilla.page"

const routes: Routes = [
    {
        path: "",
        component: FormAncestrosPlanillaPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormAncestrosPlanillaPageRoutingModule {}
