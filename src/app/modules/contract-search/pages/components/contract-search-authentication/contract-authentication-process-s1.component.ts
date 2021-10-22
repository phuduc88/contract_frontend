import { Component, OnInit, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { AuthenticationService, SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contract-authentication-process-s1',
  templateUrl: './contract-authentication-process-s1.component.html',
  styleUrls: ['./contract-authentication-process-s1.component.less']
})
export class ContractAuthenticationProcessS1Component implements OnInit {
  @Output() onChangeFile: EventEmitter<any> = new EventEmitter();
  constructor()
  {
  }

  ngOnInit() {

  }

  handleChange(e){
    this.onChangeFile.emit(e);
  }
}
