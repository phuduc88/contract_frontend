import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SIGNATURE } from "@app/shared/constant";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import * as $ from "jquery";
import "jqueryui";
import { AuthenticationService, SignFlowService } from "@app/core/services";
import { Credential } from "@app/core/models";
import signUtils from "@app/shared/utils/sign";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from "@angular/router";
import {
  RefuseSearchComponent,
  SignContractComponent,
} from "@app/shared/components";

@Component({
  selector: "app-contract-authentication-process-s2",
  templateUrl: "./contract-authentication-process-s2.component.html",
  styleUrls: ["./contract-authentication-process-s2.component.less"],
})
export class ContractAuthenticationProcessS2Component implements OnInit {
  id: any;
  isAuthentication = false;
  @Input() documentSign: any;
  @Input() isApprove: boolean = true;
  pagesDocument: any;
  currentUser: Credential;
  isDisplay: boolean = false;
  private handlers;
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
    private signFlowService: SignFlowService,
    private route: ActivatedRoute,
    private modal: NzModalRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.handlers = [
      eventEmitter.on("authentication:approve", () => {
        this.approve();
      }),
      eventEmitter.on("authentication:refuseApprove", () => {
        this.refuseApprove();
      }),
      eventEmitter.on("authentication:sign", () => {
        this.sign();
      }),
      eventEmitter.on("authentication:refuseSign", () => {
        this.refuseSign();
      }),
    ];
  }

  signSelected(sign) {
    eventEmitter.emit("sign:selection", sign);
  }

  changeEmailAssignment(emailAssignment) {
    eventEmitter.emit("sign:changeEmailAssignment", emailAssignment);
  }

  updateLocationOfSign(currentSign) {
    const listSignCopy = [...this.documentSign.listSign];
    listSignCopy.forEach((item) => {
      if (item.privateId == currentSign.privateId) {
        item.coordinateY = currentSign.top;
        item.coordinateX = currentSign.left;
        item.page = currentSign.page;
        item.scale = currentSign.scaleX;
      }
    });
    this.documentSign.listSign = listSignCopy;
  }

  ngAfterViewInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.documentSign.listSign,
      event.previousIndex,
      event.currentIndex
    );
  }

  authentication() {
    this.isAuthentication = !this.isAuthentication;
  }

  goBack() {
    this.modal.destroy();
  }

  approve() {
    this.modalService.confirm({
      nzTitle: "BẠN CÓ CHĂC MUỐN PHÊ DUYỆT HỢP ĐỒNG NÀY ?",
      nzOkText: "CÓ",
      nzCancelText: "KHÔNG",
      nzClosable: false,
      nzClassName: "approve-modal",
      nzOnOk: () => {
        this.modal.destroy({
          action: 1,
          documentId: this.documentSign.id,
          reason: '',
          isApprove: true
        });
      },
    });
  }

  refuseApprove() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Từ chối phê duyệt",
      nzClassName: "refuse-approve-custom",
      nzContent: RefuseSearchComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzFooter: [],
    });

    modal.afterClose.subscribe(result => {
      if (!result) return; 
      
      this.modal.destroy({
        ...result,
        documentId: this.documentSign.id,
        action: 1,        
        isApprove: false
      });
    })
  }

  sign() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Loại chữ ký số",
      nzClassName: "sign-contract-custom",
      nzContent: SignContractComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzFooter: [],
    });
  }

  refuseSign() {
    const modal  = this.modalService.create({
      nzClosable: true,
      nzTitle: "Từ chối ký duyệt",
      nzClassName: "refuse-sign-custom",
      nzContent: RefuseSearchComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzFooter: [],
    });

    modal.afterClose.subscribe(result => {
      if (!result) return; 
      
      this.modal.destroy({
        ...result,
        documentId: this.documentSign.id,
        action: 2,        
        isApprove: false
      });
    })

  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }
}
