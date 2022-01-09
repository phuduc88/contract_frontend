import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "@app/shared/layout";
import { DashboardComponent, DashboardUseContractComponent, DashboardSendSmsComponent } from "./pages";
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';
import { PERMISSIONS } from '@app/shared/constant';

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
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.reportManagementUseContract
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      },
      {
        path: "send-sms",
        component: DashboardSendSmsComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.reportManagementUseSMS
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
