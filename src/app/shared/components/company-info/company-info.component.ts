import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit, ViewContainerRef, OnChanges } from "@angular/core";
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { AuthenticationService } from '@app/core/services';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.less']
})
export class CompnayInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: any;
  constructor(
    private authService: AuthenticationService
  ) 
  {}

  ngOnInit() {
    this.currentUser = this.authService.currentCredentials;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() { }
}
