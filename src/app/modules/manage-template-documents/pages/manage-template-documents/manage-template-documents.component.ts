import { Component, OnInit, OnDestroy } from "@angular/core";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-manage-template-documents",
  templateUrl: "./manage-template-documents.component.html",
  styleUrls: ["./manage-template-documents.component.less"],
})
export class ManageTemplateDocumentsComponent implements OnInit, OnDestroy {
  currentStep = 1;
  overloading = false;
  private handlers;
  parentStyle = {};

  ngOnInit() {
    this.handlers = [
      eventEmitter.on(
        "template-document:nextStep",
        ({ file, goStep }) => {
          this.changeFileSuccess(file, goStep);
        }
      ),

      eventEmitter.on(
        "template-document:prevStep",
        ({ file, goStep }) => {
          this.changeFileSuccess(file, goStep);
        }
      ),
    ];
  }

  changeFileSuccess(file, goStep) {
    this.overloading = true;
    this.parentStyle = {
      "z-index": 99999,
      opacity: 0.3,
    };
    setTimeout(() => {
      this.currentStep = goStep;
      console.log(file);
      this.overloading = false;
      this.parentStyle = {};
    }, 2000);
  }

  ngOnDestroy(): void {
    eventEmitter.destroy(this.handlers);
  }
}
