import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { NzCardModule } from "ng-zorro-antd/card";

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
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { AuthenticationService } from "@app/core/services";
import { SharedModule } from "@app/shared/shared.module";
import { GeneralSettingsRoutingModule } from "./system-settings-routing.module";
import {
  SystemSettingsComponent,
  EmailFormComponent
} from "./pages";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
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
    NzTabsModule,
    GeneralSettingsRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    SystemSettingsComponent,
    EmailFormComponent
  ],
  providers: [AuthenticationService],
  entryComponents: [],
})
export class SystemSettingsModule {}
