import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { AuthenticationService } from "@app/core/services";
import { SharedModule } from "@app/shared/shared.module";
import { ContractSearchRoutingModule } from "./contract-search-routing.module";
import {
  ContractSearchComponent,
  ContractSearchListComponent,
  ContractSearchFormComponent,
  ContractSearchTableComponent,
  ContractSearchAuthenticationComponent,
  ContractAuthenticationProcessS1Component,
  ContractAuthenticationProcessS2Component,
  ContractAuthenticationInfoComponent,
} from "./pages";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzSelectModule,
    NzSpinModule,
    NzUploadModule,
    NzTableModule,
    NzRadioModule,
    NzCheckboxModule,
    ContractSearchRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    ContractSearchComponent,
    ContractSearchListComponent,
    ContractSearchFormComponent,
    ContractSearchTableComponent,
    ContractSearchAuthenticationComponent,
    ContractAuthenticationProcessS1Component,
    ContractAuthenticationProcessS2Component,
    ContractAuthenticationInfoComponent,
  ],
  providers: [AuthenticationService],
  entryComponents: [],
})
export class ContractSearchModule {}
