import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { OrderAnalysisComponent } from "./order-analysis/order-analysis.component";
import { MenuComponent } from "./menu/menu.component";
import { QualityAnalysisComponent } from "./quality-analysis/quality-analysis.component";

@NgModule({
  declarations: [
    AppComponent,
    OrderAnalysisComponent,
    MenuComponent,
    QualityAnalysisComponent,
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
