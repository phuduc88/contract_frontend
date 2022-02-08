import { AfterViewInit, Component, OnInit, ViewContainerRef,  } from '@angular/core';

import { TIME_PICKERS } from '@app/shared/constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ROLE } from "@app/shared/constant";
import { SignatureFlowComponent, SignaturePadComponent } from '@app/shared/components';
import { AuthenticationService } from "@app/core/services";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  Timepickers = TIME_PICKERS;
  isClient: boolean = false;
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private authService: AuthenticationService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    const level = this.authService.currentCredentials.role.level; 
    this.isClient = (level === ROLE.CLIENT);
  }

  showDialogDocumentSign() {
    const documentSignTemp = {
      id: null,
      myselfSign: false,
      currentStep: 0,
      documentType: null,
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

  showPageDocumentTemplate() {
    this.router.navigate(['/manage-template-documents']);
  }

  openAuthenContract() {
    this.router.navigate(['/contract/authentication']);
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
      nzWidth: 750,
      nzTitle: 'Chữ ký của bạn',
      nzClassName: "signature-pad-custom",
      nzContent: SignaturePadComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => { },
      nzFooter: [],
      nzComponentParams: {
        signPadOfUse
      }
    });
  }
}
