import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  HsmSettingFormComponent,
  ApiContractSettingFormComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
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
