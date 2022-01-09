import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  PluginSettingComponent,
} from "./pages";
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';
import { PERMISSIONS } from '@app/shared/constant';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PluginSettingComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.systemManagement
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluginSettingsRoutingModule {}
