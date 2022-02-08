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
import { AuthenticationService, SignOfUserService, DocumentEmailService, SignFlowService } from "@app/core/services";
import { Credential } from "@app/core/models";
import signUtils from "@app/shared/utils/sign";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from "@angular/router";
import {
  RefuseSearchComponent,
  SignContractComponent,
  SignaturePadComponent,
  VerifiedCodeComponent
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
  private hasSignPad: any;
  private handlers;
  constructor(
    private authService: AuthenticationService,
    private signOfUserService: SignOfUserService,
    private documentEmailService: DocumentEmailService,
    private signFlowService: SignFlowService,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private modal: NzModalRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.checkHasSignPad();
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
       eventEmitter.on("authentication:openSignPad", () => {
        this.viewSignOfUser(false);
      }),
      eventEmitter.on("authentication:signSMS", (data) => {
        this.signSMS(data);
      }),
      eventEmitter.on("authentication:signEmail", (data) => {
        this.signEmail(data);
      }),
      eventEmitter.on("authentication:signHSM", (data) => {
        this.signHSM(data);
      }),
      eventEmitter.on("authentication:signSIM", (data) => {
        this.signSIM(data);
      }),
    ];
  }

  signSelected(sign) {
    eventEmitter.emit("sign:selection", sign);
  }

  changeEmailAssignment(emailAssignment) {
    eventEmitter.emit("sign:changeEmailAssignment", emailAssignment);
  }

  private checkHasSignPad() {
    if (this.currentUser != null  &&  this.currentUser.signatureImage) {
      this.hasSignPad = true;
    } else {
      this.hasSignPad = false;
    }
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
    if (this.hasSignPad) {
      this.showDialogSign();
    } else {
      this.viewSignOfUser(true);
    }
  }
  
  signEmail(data) {
    this.documentEmailService.sendEmailVerifiedCode(data).subscribe((result) => {
      this.showDialogVerified(data);
    });
  }

  signSMS(data) {
    this.documentEmailService.sendEmailVerifiedCode(data).subscribe((result) => {
      this.showDialogVerified(data);
    });
  }

  signHSM(data) {
    this.documentEmailService.signHSM(data).subscribe((result) => {
      this.showDialogVerified(data);
    });
  }

  signSIM(data) {
    this.documentEmailService.signSim(data).subscribe((result) => {
      this.showDialogVerified(data);
    });
  }

  showDialogVerified(verified) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Ký hợp đồng",
      nzWrapClassName: "cancel-contract",
      nzContent: VerifiedCodeComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        verified,
      },
      nzFooter: [],
    });

    modal.afterClose.subscribe(result => {
      if(!result) {
        return;
      }
      eventEmitter.emit("loadDocument:sign");
      this.modalService.success({
        nzTitle: "Ký số hợp đồng thành công",
      });
    });
  }

  showDialogSign() {
    const employeesSign = this.getEmployeesSign();
    const currentUser = this.currentUser;
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 950,
      nzTitle: "Chọn phương thức ký",
      nzClassName: "sign-contract-custom",
      nzContent: SignContractComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {
        employeesSign,
        currentUser
      },
      nzFooter: [],
    });
  }
  private getEmployeesSign() {
    const employeesSign = this.documentSign.employeesSign.find(e => e.email === this.currentUser.email)
    if(employeesSign) {
       return employeesSign;
    } else {
       return {};
    }
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

  openSignaturePad(signPadOfUse, showDialogSign) {
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 750,
      nzTitle: 'Tạo chứ ký',
      nzClassName: "signature-pad-custom",
      nzContent: SignaturePadComponent,
      nzOnOk: () => {},
      nzFooter: [],
      nzComponentParams: {
        signPadOfUse
      }
    });

    modal.afterClose.subscribe(result => {

     this.updateSignOfUserOnDocument();
     if(showDialogSign) {
       this.showDialogSign();
     }
    });

  }

  viewSignOfUser(showDialogSign) {
    this.signOfUserService.getSignDefaul().subscribe((data) => {
      data.isSign = true;
      this.openSignaturePad(data, showDialogSign);
    });
  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }

  private updateSignOfUserOnDocument() {
    const user = this.authService.currentCredentials;
    if(user.signatureImage) {
      this.hasSignPad = true;
      eventEmitter.emit("sign:changeSignPad", user.signatureImage);
    }
  }

}
