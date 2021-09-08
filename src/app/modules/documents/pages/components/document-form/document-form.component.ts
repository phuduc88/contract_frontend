import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService, SignOfUserService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.less']
})
export class DocumentFormComponent implements OnInit {

  constructor()
  {
  }

  ngOnInit() {

  }
}
