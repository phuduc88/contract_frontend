import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  PluginSettingComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PluginSettingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluginSettingsRoutingModule {}
