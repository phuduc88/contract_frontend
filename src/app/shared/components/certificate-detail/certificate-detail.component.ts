import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { AuthenticationService } from '@app/core/services';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.less']
})
export class CertificateDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() employeeSignDetail: any;
  constructor(
    private modal: NzModalRef
  ) 
  {}

  ngOnInit() {
  }


  ngAfterViewInit() {
  }

  ngOnDestroy() { 
  }

  dismiss(): void {
    this.modal.destroy();
  }
   
}
