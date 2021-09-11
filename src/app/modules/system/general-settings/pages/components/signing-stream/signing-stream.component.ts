import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { SIGNING_STREAM_DATA } from "../../../data/signing-stream-table";
import { SigningStreamFormComponent } from "../signing-stream-form/signing-stream-form.component";
import { ThreadGroupService } from "@app/core/services";
import { PAGE_SIZE, GROUP_TYPE } from '@app/shared/constant';
@Component({
  selector: "app-general-settings-signing-stream",
  templateUrl: "./signing-stream.component.html",
  styleUrls: ["./signing-stream.component.less"],
})
export class SigningStreamComponent implements OnInit {
  threadGroups: any[] = [];
  groupType = GROUP_TYPE;
  total: number;
  @Output() onLoadDing: EventEmitter<any> = new EventEmitter();
  skip: number; 
  constructor(
    private modalService: NzModalService,
    private threadGroupService: ThreadGroupService,
  ) {}
  ngOnInit() {
    this.filterThreadGroup();
  }

  add() {
    const threadGroup = {
      name: null,
      userDefault: false,
      threadedSignTemplate: []
    }

    const threadedSignTemplate = this.addEmployeeSignBlank();
    threadGroup.threadedSignTemplate.push(threadedSignTemplate);
    this.showThreadGroup(threadGroup);
  }

  showThreadGroup(threadGroup) {
    const modal = this.modalService.create({
      nzWidth: 980,
      nzWrapClassName: "signing-stream-modal",
      nzTitle: "Thiết lập thông tin người nhận theo luồng ký",
      nzContent: SigningStreamFormComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        threadGroup
      },
      nzMaskClosable: false,
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        if (result.id) {
          this.updateThreadSign(result);
        } else {
          this.createThreadSign(result);
        }
      }
    });
  }

  filterThreadGroup(skip = 0, take = PAGE_SIZE) {
    // this.notificationEventLoading(true);
    this.threadGroupService.filter({
      skip,
      take,
    }).subscribe(res => {
      this.threadGroups = res.data;
      this.total = res.total;
      this.skip = skip;
      // this.notificationEventLoading(false);
    });
  }

  private addEmployeeSignBlank() {
    return {
      name: null,
      groupName: null,
      groupType: GROUP_TYPE.HSMUSB,
      receptionEmail: false,
      receptionFileCopy: false,
      address: null,
      idNumer: null,
      phoneNumber: null,
      email: null,
      taxCode: null,
      orders: '1',
      orderSign: 1
    }
  }

  private createThreadSign(threadGroup) {
    this.notificationEventLoading(true);
    this.threadGroupService.create(threadGroup).subscribe(req => {
      this.filterThreadGroup();
      this.notificationEventLoading(false);
    });
  }

  private updateThreadSign(threadGroup) {
    this.notificationEventLoading(true);
    this.threadGroupService.update(threadGroup.id, threadGroup).subscribe(req => {     
      this.filterThreadGroup();
      this.notificationEventLoading(false);
    });
  }

  private getDetail(id)
  {
    this.notificationEventLoading(true);
    this.threadGroupService.getDetailById(id).subscribe((res)=> {
      if (!res.threadedSignTemplate || res.threadedSignTemplate.length === 0) {
        res.threadedSignTemplate = [];
        const threadedSignTemplate = this.addEmployeeSignBlank();
        res.threadedSignTemplate.push(threadedSignTemplate);
      }
        this.showThreadGroup(res);
        this.notificationEventLoading(false);
    });
  }

  delete(id) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa luồng ký?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
       this.deleteThreadGroup(id);
      },
      // nzOnCancel: () => {
         
      // }
    });
  }

  deleteThreadGroup(id) {
    this.threadGroupService.delete(id).subscribe((res)=> { 
      this.filterThreadGroup();
    });
  }

  notificationEventLoading(status) {
    this.onLoadDing.emit({
      isSpinning: status,
    });
  }
}
