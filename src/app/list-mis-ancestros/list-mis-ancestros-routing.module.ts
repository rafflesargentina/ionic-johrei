import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { ListMisAncestrosPage } from "./list-mis-ancestros.page"

const routes: Routes = [
    {
        path: "",
        component: ListMisAncestrosPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListMisAncestrosPageRoutingModule {}
