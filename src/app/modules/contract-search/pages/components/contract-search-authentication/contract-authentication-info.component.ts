import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService, SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contract-authentication-info',
  templateUrl: './contract-authentication-info.component.html',
  styleUrls: ['./contract-authentication-info.component.less']
})
export class ContractAuthenticationInfoComponent implements OnInit {
    isViewerComponent: false;
    signListInfo = [
        {
            nguoi_ky: "TA",
            so_giay_to: "01234567898",
            so_dien_thoai_ky: "0102030405",
            ngay_ky: "10/10/2021"
        },
        {
            nguoi_ky: "M",
            so_giay_to: "35330166",
            so_dien_thoai_ky: "0102030405",
            ngay_ky: "10/10/2021"
        }
    ]

  constructor()
  {
  }

  ngOnInit() {

  }
}
