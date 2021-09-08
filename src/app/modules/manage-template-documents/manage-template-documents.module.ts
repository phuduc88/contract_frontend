import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { AuthenticationService } from "@app/core/services";
import { SharedModule } from "@app/shared/shared.module";
import { ManageTemplateDocumentsRoutingModule } from "./manage-template-documents-routing.module";
import {
  ManageTemplateDocumentsComponent,
  ManageTemplateDocumentsDropComponent,
  ManageTemplateDocumentsTableComponent,
} from "./pages";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzSpinModule,
    NzUploadModule,
    NzTableModule,
    NzRadioModule,
    NzCheckboxModule,
    NzTabsModule,
    ManageTemplateDocumentsRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    ManageTemplateDocumentsComponent,
    ManageTemplateDocumentsDropComponent,
    ManageTemplateDocumentsTableComponent,
  ],
  providers: [AuthenticationService],
  entryComponents: [],
})
export class ManageTemplateDocumentsModule {}
