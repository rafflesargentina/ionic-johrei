import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormNoticiaPage } from "./form-noticia.page"

const routes: Routes = [
    {
        path: "",
        component: FormNoticiaPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormNoticiaPageRoutingModule {}
