import { Component, HostBinding } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-theme-switching",
  templateUrl: "./theme-switching.component.html",
  styleUrls: ["./theme-switching.component.scss"],
})
export class ThemeSwitchingComponent {
  @HostBinding("class")
  public theme = "";

  constructor(private readonly route: ActivatedRoute) {
    document.body.style.transform = "";

    this.theme = this.route.snapshot.params["theme"];
  }
}
