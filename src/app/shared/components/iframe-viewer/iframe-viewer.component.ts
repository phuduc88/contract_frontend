import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-iframe-viewer",
  templateUrl: "./iframe-viewer.component.html",
  styleUrls: ["./iframe-viewer.component.less"],
})
export class IframeViewerComponent implements OnInit, OnDestroy {
  @Input() srcUrl: any;

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {}
}
