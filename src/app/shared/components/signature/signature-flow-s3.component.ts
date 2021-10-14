import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  OnChanges,
} from "@angular/core";
import { SIGNATURE, SIGN_TYPE } from "@app/shared/constant";
import { PDFDocumentProxy } from "pdfjs-dist";
import { eventEmitter } from "@app/shared/utils/event-emitter";
import * as $ from "jquery";
import "jqueryui";
import { AuthenticationService } from "@app/core/services";
import { Credential } from "@app/core/models";
import signUtils from "@app/shared/utils/sign";
import { NzModalService } from "ng-zorro-antd/modal";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import orderBy from 'lodash/groupBy';

@Component({
  selector: "signature-flow-s3",
  templateUrl: "./signature-flow-s3.component.html",
  styleUrls: ["signature-flow-s3.component.less"],
})
export class SignatureFlowS3Component
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @Input() documentSign: any;
  pdfDoc: PDFDocumentProxy;
  objectSelect = null;
  canvasFs = [];
  singType: any;
  selectedSignature: any;
  signsType: any = SIGN_TYPE;
  employeesSign: any;  
  currentUser: Credential;
  isDisplay: boolean = false;
  private handlers;
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService
  ) {}

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
    ];
    
  }

  ngOnChanges(changes) {
    if (changes && changes.documentSign.currentValue) {        
      this.getPesionSign(changes.documentSign.currentValue);
    }
  }

  getPesionSign(documentSign) {
    this.employeesSign = documentSign.employeesSign.filter(p => p.isEmployeeSign);     
  }

  addSignToDoc(sign) {
    if (!this.documentSign.listSign || this.documentSign.listSign.length == 0) {
      this.documentSign.listSign = [];
      this.documentSign.listSign.push(sign);      
      return;
    }

    const currentSign = this.documentSign.listSign.find((signed) => signed.privateId == sign.privateId);
    if (currentSign) {
      currentSign.page = sign.page;
    } else {
      this.documentSign.listSign.push(sign);
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
      this.singType = null;
      this.selectedSignature = new Object();
    }, 10);
  }

  setProperties(obj) {
    setTimeout(() => {
      this.isDisplay = true;
      this.selectedSignature = obj;
      this.selectedSignType();
      if (obj.isUpdate) {
        this.updateLocationOfSign(obj);
      }
    }, 10);
  }

  closeSignatureProperties() {
    this.isDisplay = false;
    this.singType = null;
  }

  private selectedSignType() {
    const employeesSigned = this.documentSign.employeesSign.find(r => r.email === this.selectedSignature.emailAssignment);
    if(employeesSigned) {
      this.singType = employeesSigned.singType;
    }
    
  }

  changeEmailAssignment(emailSelected) {
    const employeesSign = this.documentSign.employeesSign.find(r => r.email === emailSelected);
    this.singType = employeesSign.singType;
    eventEmitter.emit("sign:changeEmailAssignment", employeesSign);
  }

  updateLocationOfSign(currentSign) {
    const listSignCopy = [...this.documentSign.listSign];
    listSignCopy.forEach((item) => {
      if (item.privateId == currentSign.privateId) {
        item.coordinateY = currentSign.top;
        item.coordinateX = currentSign.left;
        item.isSelected = currentSign.isUpdate;
        item.page = currentSign.page;
        item.scale = currentSign.scaleX;
      } else {
        item.isSelected = false;
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

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }

  changeSignType(signType) {
    this.documentSign.employeesSign.forEach(item => {
      if (item.email === this.selectedSignature.emailAssignment) {
        item.singType = signType;
      }
    });
  }
}
