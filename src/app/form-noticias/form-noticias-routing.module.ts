import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormNoticiasPage } from "./form-noticias.page"

const routes: Routes = [
    {
        path: "",
        component: FormNoticiasPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormNoticiasPageRoutingModule {}
