import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AuthenticationService } from "@app/core/services";
import { SharedModule } from "@app/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import {
  DashboardComponent,
  DashboardUseContractComponent,
  DashboardSendSmsComponent,
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
  DoubleAxisChartComponent
} from "./pages";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzSpinModule,
    NzUploadModule,
    NzTableModule,
    NzRadioModule,
    NzCheckboxModule,
    NgxChartsModule,
    DashboardRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    DashboardUseContractComponent,
    DashboardSendSmsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    DoubleAxisChartComponent
  ],
  providers: [AuthenticationService],
  entryComponents: [],
})
export class DashboardModule {}
