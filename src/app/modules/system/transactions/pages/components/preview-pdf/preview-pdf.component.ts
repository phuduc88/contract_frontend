import {
  OnDestroy,
  OnInit,
  Component,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { ProductService } from "@app/core/services";
import { DATE_FORMAT, REGEX } from "@app/shared/constant";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { NzCarouselComponent } from "ng-zorro-antd/carousel";

@Component({
  selector: "app-preview-pdf",
  templateUrl: "./preview-pdf.component.html",
  styleUrls: ["./preview-pdf.component.less"],
})
export class PreviewPdfComponent implements OnInit, OnDestroy {
  @ViewChild(NzCarouselComponent, { static: false })
  carouselCustomer: NzCarouselComponent;
  @Input() imgList;

  constructor(
  
  ) {}

  ngOnInit() {
  }

  prevSlide() {
    this.carouselCustomer.pre();
  }

  nextSlide() {
    this.carouselCustomer.next();
  }

  gotoSlice(i) {
    this.carouselCustomer.goTo(Number(i));
  }

  ngOnDestroy() {}
}
