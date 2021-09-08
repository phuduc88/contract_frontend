
import { Injectable } from '@angular/core';
import { SignatureFlowComponent } from '@app/shared/components';
import 'jqueryui';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor() { }

  openModalSignDocument(modalService, viewContainerRef) {
    modalService.create({
      nzClosable: true,
      nzTitle: 'Ký tài liệu',
      nzStyle: { top: 0 },
      nzContent: SignatureFlowComponent,
      nzViewContainerRef: viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: []
    });
  }

}
