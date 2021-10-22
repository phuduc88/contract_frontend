import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SIGNATURE } from "@app/shared/constant";
import { PDFDocumentProxy } from "pdfjs-dist";
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
  documentSignCustom: any = null;
  pdfDoc: PDFDocumentProxy;
  height = 0;
  zoomX = 1;
  x = SIGNATURE.X;
  y = SIGNATURE.Y;
  objectSelect = null;
  canvasFs = [];
  selectedSignature = {};
  pagesDocument: any;
  currentUser: Credential;
  subscriptionSignatureSelected: any;
  subscriptionCurrentCanvas: any;
  isDisplay: boolean = false;
  private handlers;
  isContractSearch: boolean = true;

  confirmModal?: NzModalRef; // For testing by now

  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
    private signFlowService: SignFlowService,
    private route: ActivatedRoute
  ) {}

  getParameterByName(name: any) {
    const url = window.location.href;
    name = name.replace(/[[]]/g, "$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
    return decodeURIComponent(results[2].replace("/+/g", " "));
  }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.handlers = [
      eventEmitter.on("sign:add", (sign) => {
        this.addSignToDoc(sign);
      }),
      eventEmitter.on("sign:clear-properties", () => {
        this.clearProperties();
      }),
      eventEmitter.on("sign:set-properties", (obj) => {
        this.setProperties(obj);
      }),
      eventEmitter.on("sign:remove", (sign) => {
        this.removeSign(sign);
      }),
      eventEmitter.on("sign:NotEmailAssignment", () => {
        this.modalService.warning({ nzTitle: "Vui lòng chọn người ký !" });
      }),
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

    this.id = this.getParameterByName("s");
    this.signFlowService.getDetail(this.id || "1104").subscribe((data) => {
      this.documentSignCustom = data;
      var listSign = [
        {
          page: 4,
          coordinateY: 1110.1092965262283,
          coordinateX: 171.3839067731585,
          signType: 1,
          height: 160,
          width: 328,
          privateId: "7fea5454-82cd-456c-9177-06c171726e63",
          signIndex: 3,
          emailAssignment: "phucduc88@gmail.com",
          scaleX: 1,
          scaleY: 1,
          img: { url: "/assets/img/pdfjs/sign-icon.svg" },
          isinitial: false,
          name: "mauhopdongminvoicekhachhang1.pdf",
          fileSignId: 2137,
          scale: 1,
        },
        // {
        //   page: 4,
        //   coordinateY: 1118.1092965262283,
        //   coordinateX: 647.69,
        //   signType: 1,
        //   height: 160,
        //   width: 328,
        //   privateId: "7fea5454-82cd-456c-9177-06c171726e63",
        //   signIndex: 3,
        //   emailAssignment: "abc@gmail.com",
        //   scaleX: 1,
        //   scaleY: 1,
        //   img: { url: "/assets/img/pdfjs/sign-icon.svg" },
        //   isinitial: false,
        //   name: "mauhopdongminvoicekhachhang1.pdf",
        //   fileSignId: 1945,
        //   scale: 1,
        // },
      ];

      this.documentSign = {
        ...this.documentSignCustom,
        listSign: listSign,
      };
    });
  }

  addSignToDoc(sign) {
    if (!this.documentSign.listSign || this.documentSign.listSign.length == 0) {
      this.documentSign.listSign = [];
      this.documentSign.listSign.push(sign);
      return;
    }
    const currentSign = this.documentSign.listSign.find(
      (signed) => signed.privateId == sign.privateId
    );
    if (!currentSign) {
      this.documentSign.listSign.push(sign);
      return;
    }
  }

  removeSign(sign) {
    const listSign = this.documentSign.listSign;
    if (listSign && listSign.length > 0) {
      listSign.forEach((item, index) => {
        if (sign.privateId == item.privateId) {
          listSign.splice(index, 1);
        }
      });
    }
  }

  signSelected(sign) {
    eventEmitter.emit("sign:selection", sign);
  }

  clearProperties() {
    setTimeout(() => {
      this.isDisplay = false;
      this.selectedSignature = new Object();
    }, 10);
  }

  setProperties(obj) {
    setTimeout(() => {
      this.isDisplay = true;
      this.selectedSignature = obj;
      if (obj.isUpdate) {
        this.updateLocationOfSign(obj);
      }
    }, 10);
  }

  closeSignatureProperties() {
    this.isDisplay = false;
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
    // Init drag for Signature Image
    $(SIGNATURE.SELECTOR.ObjDragToViewer).draggable({
      cursor: "move",
      containment: $(SIGNATURE.SELECTOR.Containment),
      helper: "clone",
      drag: function (e) {
        let parent = e.target["offsetParent"];
        if (parent) {
          $(parent).addClass("width");
        }
      },
    });
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

  goBack() {}

  approve() {
    this.confirmModal = this.modalService.confirm({
      nzTitle: "BẠN CÓ CHĂC MUỐN PHÊ DUYỆT HỢP ĐỒNG NÀY ?",
      nzOkText: "CÓ",
      nzCancelText: "KHÔNG",
      nzClosable: false,
      nzClassName: "approve-modal",
      nzOnOk: () => {
        alert("OK");
      },
    });
  }

  refuseApprove() {
    this.confirmModal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Từ chối phê duyệt",
      nzClassName: "refuse-approve-custom",
      nzContent: RefuseSearchComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzFooter: [],
    });
  }

  sign() {
    this.confirmModal = this.modalService.create({
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
    this.confirmModal = this.modalService.create({
      nzClosable: true,
      nzTitle: "Từ chối ký duyệt",
      nzClassName: "refuse-sign-custom",
      nzContent: RefuseSearchComponent,
      nzOnOk: (data) => console.log("Click ok", data),
      nzComponentParams: {},
      nzFooter: [],
    });
  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }
}
