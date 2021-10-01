import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "@app/shared/layout";
import { DashboardComponent, DashboardUseContractComponent, DashboardSendSmsComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "use-contract",
        component: DashboardUseContractComponent,
      },
      {
        path: "send-sms",
        component: DashboardSendSmsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
