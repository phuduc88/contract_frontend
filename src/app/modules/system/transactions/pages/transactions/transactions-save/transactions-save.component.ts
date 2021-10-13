import {
  OnDestroy,
  OnInit,
  Component,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { ProductService } from "@app/core/services";
import { DATE_FORMAT, REGEX } from "@app/shared/constant";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { NzCarouselComponent } from "ng-zorro-antd/carousel";
import { DomSanitizer } from "@angular/platform-browser";
import { RefuseComponent } from "@app/shared/components";

@Component({
  selector: "app-transactions-save",
  templateUrl: "./transactions-save.component.html",
  styleUrls: ["./transactions-save.component.less"],
})
export class TransactionsSaveComponent implements OnInit, OnDestroy {
  @ViewChild(NzCarouselComponent, { static: false })
  carouselCustomer: NzCarouselComponent;
  id: any;
  form: FormGroup;
  array = [1, 2, 3, 4];

  imgList = [];
  imgListNguoiDaiDien = [];
  imgListBieuMau = [];
  confirmModal?: NzModalRef; // For testing by now

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private sanitizer: DomSanitizer,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadForm();
  }

  public loadForm() {
    this.form = this.formBuilder.group({
      transactionsType: ["Khách hàng doanh nghiệp"],
      name: ["", Validators.required],
      taxCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      district: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      tel: ["", [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)]],
      fullName: ["", Validators.required],
      package: ["", Validators.required],
      status: ["1", Validators.required],
      device: ["TOKEN"],
      transactionType: ["NEW"],
      serial: [""],
      tokenType: ["HARD_TOKEN_EPASS2003"],
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isLt10M = file.size! / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error("File phải nhỏ hơn 10MB!");
        observer.complete();
        return;
      }
      observer.next(isLt10M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }, type): void {
    switch (info.file.status) {
      case "uploading":
        break;
      default:
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          switch (type) {
            case "DN":
              this.imgList.push(this.sanitizer.bypassSecurityTrustResourceUrl(img));
              break;
            case "PL":
              this.imgListNguoiDaiDien.push(this.sanitizer.bypassSecurityTrustResourceUrl(img));
              break;
            default:
              this.imgListBieuMau.push(this.sanitizer.bypassSecurityTrustResourceUrl(img));
              break;
          }
        });
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  refuse(){
    this.confirmModal = this.modalService.create({
        nzClosable: true,
        nzTitle: "Từ chối giao dịch",
        nzClassName: "refuse-approve-custom",
        nzContent: RefuseComponent,
        nzOnOk: (data) => console.log("Click ok", data),
        nzComponentParams: {},
        nzFooter: [],
      });
  }

  ngOnDestroy() {}
}
