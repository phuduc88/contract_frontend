import { OnInit, Directive, ElementRef, OnDestroy, Input } from "@angular/core";

const CARD_OFFSET = 20;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[pdfViewerFullHeight]",
})
export class PdfViewerFullHeightDirective implements OnInit, OnDestroy {
  @Input() currentStep;

  constructor(private elementRef: ElementRef) {
    this.updateElementHeight = this.updateElementHeight.bind(this);
  }

  ngOnInit() {
    this.updateElementHeight();

    window.addEventListener("resize", this.updateElementHeight);
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.updateElementHeight);
  }

  updateElementHeight() {
    const element = this.elementRef.nativeElement;
    const header = document.getElementsByClassName("ant-modal-header")[0];
    const footer = document.getElementsByClassName("signature-flow-footer")[0];
    const controlFile = document.getElementsByClassName("control-file")[0];

    element.style.height = `${
      window.innerHeight -
      header.clientHeight -
      footer.clientHeight -
      controlFile.clientHeight -
      CARD_OFFSET
    }px`;
  }
}
