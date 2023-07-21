import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChatComponent } from "./chat/chat.component";
import { MenuComponent } from "./menu/menu.component";
import {
  HuaXingProdLineComponent
} from "./huaxing-prod-line/hua-xing-prod-line.component";
import {
  OrderAnalysisComponent,
} from "./order-analysis/order-analysis.component";
import {
  QualityAnalysisComponent,
} from "./quality-analysis/quality-analysis.component";
import {
  ThemeSwitchingComponent
} from "./theme-switching/theme-switching.component";

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
  },
  {
    path: "order-analysis",
    component: OrderAnalysisComponent,
  },
  {
    path: "quality-analysis",
    component: QualityAnalysisComponent,
  },
  {
    path: "hua-xing-prod-line",
    component: HuaXingProdLineComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  },
  {
    path: "theme-switching/:theme",
    component: ThemeSwitchingComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { relativeLinkResolution: "legacy", useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
