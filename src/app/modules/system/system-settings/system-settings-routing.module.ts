import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AuthorizeGuard,
  UnsavedChangesGuard,
  NavigationGuard,
} from "@app/core/guards";

import { PERMISSIONS } from "@app/shared/constant";

import { LayoutComponent } from "@app/shared/layout";
import { SystemSettingsComponent, EmailFormComponent } from "./pages/index";

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
        path:'email',
        component: EmailFormComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingsRoutingModule {}
