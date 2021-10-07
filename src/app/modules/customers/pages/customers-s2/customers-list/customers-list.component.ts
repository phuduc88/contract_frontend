import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientService } from '@app/core/services/client.service';
import { PAGE_SIZE, CLIENT_TYPE, CLIENT_TYPE_MASTER} from '@app/shared/constant';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogCustomerComponent, DialogClientUploadComponent } from '@app/shared/components';
import { NzModalService } from "ng-zorro-antd/modal";
import { DialogUploadTemplateErrorComponent } from '@app/shared/components';

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.less"],
})
export class CustomersListS2Component implements OnInit, OnDestroy {
  selectedPage: any = 1;
  clients: any[];
  formSearch: FormGroup;
  total: number;
  customersType = CLIENT_TYPE;
  customersTypeView = CLIENT_TYPE_MASTER;
  keyword: string ='';  
  isSpinning: boolean = false;
  customerType: any;
  skip: number;
  constructor(
    private clientService: ClientService,
    private messageService: NzMessageService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      keyword: [''],
      customerType: [''],
    });

    this.getClients();
  }

  ngOnDestroy() {}

  private getClients(skip = 0, take = PAGE_SIZE) {
    this.isSpinning = true;
    this.clientService.filter({
      name: this.keyword,
      cutomerType: this.customerType,
      skip,
      take
    }).subscribe(res => {
      this.clients = res.data;
      this.total = res.total;
      this.skip = skip;
      this.isSpinning = false;
      if (res.data.length === 0 && this.selectedPage > 1) {
        this.skip -= PAGE_SIZE;
        this.selectedPage -= 1;
        this.getClients(this.skip);
      }
    });
  }

  add() {
    this.showDialogCustomer({
      customerType: 1,
    });
  }

  upload() {
    this.showDialogClientUpload();
  }

  delete(id) {
    this.clientService.delete(id).subscribe(() => {
      this.getClients(this.skip);
    },
      (err) => {
        this.translateService.get(err.message).subscribe(message => {
          this.messageService.create('error', message);
        });
      });
  }

  pageChange({ skip, page }) {
    this.selectedPage = page;
    this.skip = skip;
    this.getClients(skip);
  }

  changeKeyword(event) {
    this.keyword = event;
    this.getClients();
  }

  changeClientType(event) {
    this.customerType = event;
    this.getClients();
  }

  private showDialogCustomer(customerInfo: any) {
    let tilte = 'Tạo mới khách hàng';
    if (customerInfo.id) {
      tilte = `Chỉnh sửa ${customerInfo.customerName}`;
    }
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 1000,
      nzTitle: tilte,
      nzClassName: "signature-pad-custom",
      nzContent: DialogCustomerComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        customerInfo
      }
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        if (result.id) {
          this.updateCustomer(result);
        } else {
          this.createCustomer(result);
        }
      }
    });
  }


  private showDialogClientUpload() {
    const modal = this.modalService.create({
      nzClosable: true,
      nzWidth: 650,
      nzTitle: 'Upload khách hàng',
      nzClassName: "signature-pad-custom",
      nzContent: DialogClientUploadComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
      }
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.uploadData(result);
      }
    });
  }

  edit(id) {
    this.isSpinning = true;
    this.clientService.getDetailById(id).subscribe(res =>{
      this.showDialogCustomer(res);
      this.isSpinning = false;
    });
  }

  uploadData(fileInfo) {
    this.clientService.uploadFile(fileInfo).subscribe((res) => {
      if (res.error.length > 0) {
        this.showDialogError(res.error);
      } else {
        this.skip = 0;
        this.getClients();
      }
    })
  }

  createCustomer(customerInfo) {
    this.clientService.create(customerInfo).subscribe(data => {
      this.skip = 0;
      this.getClients();
    });
  }

  updateCustomer(customerInfo) {
    this.clientService.update(customerInfo.id, customerInfo).subscribe(data => {
      this.getClients();
    });
  }

  private showDialogError(errors) {
    this.modalService.create({
      nzClosable: true,
      nzTitle: 'Lỗi upload danh sách khách hàng',
      nzClassName: "signature-pad-custom",
      nzContent: DialogUploadTemplateErrorComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
        errors
      }
    });
  }

}
