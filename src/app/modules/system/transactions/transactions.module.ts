import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzUploadModule } from "ng-zorro-antd/upload";

import { AuthenticationService } from "@app/core/services";
import { SharedModule } from "@app/shared/shared.module";
import { TransactionsRoutingModule } from "./transactions-routing.module";
import {
  TransactionListComponent,
  TransactionsSaveComponent,
  PreviewImageComponent,
  PreviewPdfComponent,
} from "./pages";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzSelectModule,
    NzTableModule,
    NzRadioModule,
    NzIconModule,
    NzCheckboxModule,
    NzUploadModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    TransactionListComponent,
    TransactionsSaveComponent,
    PreviewImageComponent,
    PreviewPdfComponent,
  ],
  providers: [AuthenticationService],
  entryComponents: [],
})
export class TransactionsModule {}
