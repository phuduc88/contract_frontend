import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SIGNATURE } from '@app/shared/constant';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import * as $ from 'jquery';
import 'jqueryui';
import { AuthenticationService } from "@app/core/services";
import { Credential } from '@app/core/models';
import signUtils from '@app/shared/utils/sign';
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'signature-flow-s3',
  templateUrl: './signature-flow-s3.component.html',
  styleUrls: ['signature-flow-s3.component.less']
})
export class SignatureFlowS3Component implements OnInit, OnDestroy, AfterViewInit {
  @Input() documentSign: any;
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
  constructor(
    private authService: AuthenticationService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
    this.handlers = [
      eventEmitter.on("sign:add", (sign) => {
        this.addSignToDoc(sign);
      }),
      eventEmitter.on("sign:clear-properties", () => {
        this.clearProperties()
      }),
      eventEmitter.on("sign:set-properties", (obj) => {
        this.setProperties(obj);
      }),
      eventEmitter.on('sign:remove', (sign) => {
        this.removeSign(sign);
      }),
      eventEmitter.on("sign:NotEmailAssignment", () => {
        this.modalService.warning({ nzTitle: 'Vui lòng chọn người ký !' });
      })
    ];
  }

  addSignToDoc(sign) {
    if(!this.documentSign.listSign || this.documentSign.listSign.length == 0) {
      this.documentSign.listSign = [];
      this.documentSign.listSign.push(sign);
      return;
    }
    const currentSign = this.documentSign.listSign.find(signed => signed.privateId == sign.privateId);
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
    eventEmitter.emit('sign:selection', sign);
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
    listSignCopy.forEach(item => {
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
      cursor: 'move',
      containment: $(SIGNATURE.SELECTOR.Containment),
      helper: 'clone',
      drag: function (e) {
        let parent = e.target["offsetParent"];
        if (parent) {
          $(parent).addClass('width');
        }
      }
    });
  }

  ngOnDestroy() {
    eventEmitter.destroy(this.handlers);
  }

}
