import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService, SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contract-search-form',
  templateUrl: './contract-search-form.component.html',
  styleUrls: ['./contract-search-form.component.less']
})
export class ContractSearchFormComponent implements OnInit {

  constructor()
  {
  }

  ngOnInit() {

  }
}
