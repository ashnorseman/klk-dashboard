import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {
    const scaleX = window.innerWidth / document.body.clientWidth;
    const scaleY = window.innerHeight / document.body.clientHeight;

    document.body.style.transform = `scale(${scaleX}, ${scaleY})`;
  }
}
