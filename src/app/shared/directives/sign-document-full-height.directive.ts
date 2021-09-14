import {
  OnInit,
  Directive,
  ElementRef,
  OnDestroy,
  Input,
  OnChanges,
} from "@angular/core";

const CARD_OFFSET = 20;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[signDocumentFullHeight]",
})
export class SignDocumentFullHeightDirective
  implements OnInit, OnDestroy, OnChanges
{
  @Input() currentStep;

  constructor(private elementRef: ElementRef) {
    this.updateElementHeight = this.updateElementHeight.bind(this);
  }

  ngOnInit() {
    this.updateElementHeight();

    window.addEventListener("resize", this.updateElementHeight);
  }

  ngOnChanges(value) {
    this.updateElementHeight();
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.updateElementHeight);
  }

  updateElementHeight() {
    const element = this.elementRef.nativeElement;
    const header = document.getElementsByClassName("ant-modal-header")[0];
    const footer = document.getElementsByClassName("modal-footer")[0];
    const headerLeft = document.getElementsByClassName("header-left")[0];

    element.style.height = `${
      window.innerHeight -
      header.clientHeight -
      footer.clientHeight -
      (this.currentStep === 1 ? CARD_OFFSET : 0) -
      (this.currentStep === 99 ? headerLeft.clientHeight : 0)
    }px`;

    switch (this.currentStep) {
      case 1:
      case 99:
        element.style.overflowX = "hidden";
        element.style.overflowY = "scroll";
        break;
      case 2:
        element.style.overflowY = element.style.overflowX = "clip";
        break;
      default:
        element.style.overflow = "hidden";
        break;
    }
  }
}
