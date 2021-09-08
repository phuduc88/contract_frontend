import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';

import { TIME_PICKERS } from '@app/shared/constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SignatureFlowComponent, SignaturePadComponent } from '@app/shared/components';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  Timepickers = TIME_PICKERS;

  constructor(
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
  }

  showDialogDocumentSign() {
    const documentSignTemp = {
      id: null,
      myselfSign: false,
      currentStep: 0,
      documentType: 1,
      employeesSign: [],
      filesSign: [],
      listSign: []
    }
    this.showDocumentSign(documentSignTemp);
  }


  showDocumentSign(documentSign) {
    this.modalService.create({
      nzClosable: false,
      nzTitle: 'Ký tài liệu',
      nzStyle: { top: 0 },
      nzClassName: "signature-flow",
      nzKeyboard: false,
      nzContent: SignatureFlowComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        documentSign,
      }
    });
  }

  ngAfterViewInit() {
  }

  openSignaturePad() {
    const signPadOfUse = {
      isDraw: true,
      data: null,
      useDefault: false
    }

    this.modalService.create({
      nzClosable: true,
      nzTitle: 'Chữ ký của bạn',
      nzClassName: "signature-pad-custom",
      nzContent: SignaturePadComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [],
      nzComponentParams: {
        signPadOfUse
      }
    });
  }
}
