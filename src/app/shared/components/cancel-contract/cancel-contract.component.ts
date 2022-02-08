import { Input, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzUploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { REGEX } from "@app/shared/constant";

@Component({
  selector: "app-cancel-contract",
  templateUrl: "./cancel-contract.component.html",
  styleUrls: ["./cancel-contract.component.less"],
})
export class CancelContractComponent implements OnInit, OnDestroy {
  formRefuse: FormGroup;
  fileList: NzUploadFile[] = [];
  constructor(private formBuilder: FormBuilder,
    private modal: NzModalRef,) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {}

  private loadForm() {
    this.formRefuse = this.formBuilder.group({
      reason: ["", Validators.required],
    });
  }

  save() {
    for (const i in this.formRefuse.controls) {
      this.formRefuse.controls[i].markAsDirty();
      this.formRefuse.controls[i].updateValueAndValidity();
    }

    if (this.formRefuse.invalid) {
      return;
    }
    const formValue = this.formRefuse.getRawValue();
    const formData = new FormData();
    formData.append('reason', formValue.reason);
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    
    this.modal.destroy(formData);
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  dismiss(): void {
    this.modal.destroy();
  }
}
