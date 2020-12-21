import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormPlanillaPage } from "./form-planilla.page"

const routes: Routes = [
    {
        path: "",
        component: FormPlanillaPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormPlanillaPageRoutingModule {}
