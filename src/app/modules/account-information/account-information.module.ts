import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AuthenticationService } from '@app/core/services';
import { SharedModule } from '@app/shared/shared.module';
import { AccountInformationRoutingModule } from './account-information-routing.module';
import { AccountInformationComponent } from './pages';
import { InviteEmployeeComponent } from './components/tab-information/invite-employee.component'
import {
  TabInformationComponent,
  TabSignatureComponent,
  TreeEmployeeComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzSpinModule,
    NzUploadModule,
    NzRadioModule,
    NzCheckboxModule,
    AccountInformationRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountInformationComponent,
    TabInformationComponent,
    TabSignatureComponent,
    TreeEmployeeComponent,
    InviteEmployeeComponent
  ],
  providers: [
    AuthenticationService
  ],
  entryComponents: []
})
export class AccountInformationModule { }
