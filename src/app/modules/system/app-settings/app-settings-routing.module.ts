import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  AppSettingComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AppSettingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
