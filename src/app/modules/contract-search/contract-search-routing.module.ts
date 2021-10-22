import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  ContractSearchListComponent,
  ContractSearchAuthenticationComponent,
} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: ContractSearchListComponent,
      },
      {
        path: "authentication",
        component: ContractSearchAuthenticationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractSearchRoutingModule {}
