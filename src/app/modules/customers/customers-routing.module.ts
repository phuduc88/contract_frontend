import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";

import {
  CustomersListS2Component,
  CustomersAddS2Component,
  CustomersEditS2Component,
  CustomersImportComponent
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: CustomersListS2Component,
      },
      {
        path: "add",
        component: CustomersAddS2Component,
      },
      {
        path: ":id/edit",
        component: CustomersEditS2Component,
      },
      {
        path: "import",
        component: CustomersImportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
