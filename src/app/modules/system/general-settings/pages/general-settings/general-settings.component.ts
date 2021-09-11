import { Component, OnInit } from "@angular/core";
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { NzModalService } from "ng-zorro-antd/modal";
import { DialogErrorComponent } from '@app/shared/components';
@Component({
  selector: "app-general-settings",
  templateUrl: "./general-settings.component.html",
  styleUrls: ["./general-settings.component.less"],
})
export class GeneralSettingsComponent implements OnInit {
  private handlers;
  isSpinning: boolean = false;
  constructor(
    private modalService: NzModalService) 
  {
  }
  ngOnInit() {
    this.handlers = [
      eventEmitter.on('valid:addEmployeeSign', ({ errors }) => {
        this.showDialogError(errors);
      }) 
    ];
  }

  onLoadDing(data) {
    this.isSpinning = data.isSpinning;
  }

  private showDialogError(errorsData: any) {
    this.modalService.create({
      nzClosable: true,
      nzTitle: 'Lỗi thông tin người ký',
      nzClassName: "signature-pad-custom",
      nzContent: DialogErrorComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        errorsData
      }
    });
  }
}
