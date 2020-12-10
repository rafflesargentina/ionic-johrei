import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FormPasswordPage } from "./form-password.page"

const routes: Routes = [
    {
        path: "",
        component: FormPasswordPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormPasswordPageRoutingModule {}
