import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MenuComponent } from "./menu/menu.component";
import { OrderAnalysisComponent } from "./order-analysis/order-analysis.component";

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
  },
  {
    path: "order-analysis",
    component: OrderAnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy", useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
