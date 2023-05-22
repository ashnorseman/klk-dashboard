import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import {
  OrderAnalysisComponent,
} from "./order-analysis/order-analysis.component";
import {
  QualityAnalysisComponent,
} from "./quality-analysis/quality-analysis.component";
import { HuaXingProdLineComponent } from './huaxing-prod-line/hua-xing-prod-line.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderAnalysisComponent,
    MenuComponent,
    QualityAnalysisComponent,
    HuaXingProdLineComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
