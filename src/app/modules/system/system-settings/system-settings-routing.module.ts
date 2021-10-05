import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AuthorizeGuard,
  UnsavedChangesGuard,
  NavigationGuard,
} from "@app/core/guards";

import { PERMISSIONS } from "@app/shared/constant";

import { LayoutComponent } from "@app/shared/layout";
import {
  HsmSettingFormComponent,
  ApiContractSettingFormComponent,
  SystemSettingsComponent,
  EmailFormComponent,
  SmsSettingFormComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: SystemSettingsComponent,
      },
      {
        path: "email",
        component: EmailFormComponent,
      },
      {
        path: "sms-form",
        component: SmsSettingFormComponent,
      },
      {
        path: "hsm",
        component: HsmSettingFormComponent,
      },
      {
        path: "api-contract",
        component: ApiContractSettingFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingsRoutingModule {}
