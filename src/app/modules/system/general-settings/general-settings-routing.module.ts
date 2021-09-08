import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AuthorizeGuard,
  UnsavedChangesGuard,
  NavigationGuard,
} from "@app/core/guards";
import { PERMISSIONS } from "@app/shared/constant";

import { LayoutComponent } from "@app/shared/layout";
import { GeneralSettingsComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: GeneralSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingsRoutingModule {}
