import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REGEX } from "@app/shared/constant";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { eventEmitter } from "@app/shared/utils/event-emitter";

@Component({
  selector: "app-sign-contract-type",
  templateUrl: "./sign-contract-type.component.html",
  styleUrls: ["./sign-contract-type.component.less"],
})
export class SignContractTypeComponent implements OnInit, OnDestroy {
  signTypeForm: FormGroup;
  loading = false;
  avatarUrl?: string;

  constructor(
    private formBuilder: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.signTypeForm = this.formBuilder.group({
      mobile: [
        "",
        [Validators.required, Validators.pattern(REGEX.PHONE_NUMBER)],
      ],
      uploadType: ["usbToken"],
      typeValue: ["SIM"],
    });
  }

  get typeValue() {
    return this.signTypeForm.controls.typeValue.value;
  }
  ngOnDestroy() {}

  private save() {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJpgOrPng) {
        this.msg.error("Bạn chỉ có thể tải lên ảnh");
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error("Kích thước ảnh nhỏ hơn 2 MB");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case "uploading":
        this.loading = true;
        break;
      default:
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          eventEmitter.emit("sign:changeImage", {
            imgUrl: img,
            imgType: info.file.type,
          });
        });
        break;
    }
  }
}
