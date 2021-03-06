import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { RedirectIfNotAuthenticatedService } from "src/app/Services/Guard/redirect-if-not-authenticated.service"
import { TabsPage } from "./tabs.page"

const routes: Routes = [
    {
        path: "tabs",
        component: TabsPage,
        children: [
            {
                path: "tab1",
                loadChildren: () => import("../tab1/tab1.module").then(m => m.Tab1PageModule),
                canActivate: [RedirectIfNotAuthenticatedService]
            },
            {
                path: "tab2",
                loadChildren: () => import("../tab2/tab2.module").then(m => m.Tab2PageModule),
                canActivate: [RedirectIfNotAuthenticatedService]
            },
            {
                path: "tab3",
                loadChildren: () => import("../tab3/tab3.module").then(m => m.Tab3PageModule),
                canActivate: [RedirectIfNotAuthenticatedService]
            },
            {
                path: "tab4",
                loadChildren: () => import("../tab4/tab4.module").then(m => m.Tab4PageModule),
                canActivate: [RedirectIfNotAuthenticatedService]
            },
            {
                path: "",
                redirectTo: "/tabs/tab1",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full"
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
