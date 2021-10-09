import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.less']
})
export class ChangePasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  private currentUser: any;
  constructor(
    private authService: AuthenticationService,
  ) 
  {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
  }

  changePassword() {
    eventEmitter.emit('changePassWord:open', true);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() { 
  }
   
}
