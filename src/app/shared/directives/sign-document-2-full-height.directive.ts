import {
  OnInit,
  Directive,
  ElementRef,
  OnDestroy,
  Input
} from "@angular/core";

const CARD_OFFSET = 20;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[signDocument2FullHeight]",
})
export class SignDocument2FullHeightDirective
  implements OnInit, OnDestroy
{
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
    const footer = document.getElementsByClassName("modal-footer")[0];
    const headerLeft = document.getElementsByClassName("header-left")[0];

    element.style.height = `${
      window.innerHeight -
      header.clientHeight -
      footer.clientHeight -
      headerLeft.clientHeight - 
      CARD_OFFSET
    }px`;

    element.style.overflowX = "hidden";
    element.style.overflowY = "scroll";
  }
}
