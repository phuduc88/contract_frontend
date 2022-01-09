import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/shared/layout";
import {
  ContractSearchListComponent,
  ContractSearchAuthenticationComponent,
} from "./pages";
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';
import { PERMISSIONS } from '@app/shared/constant';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "search",
        component: ContractSearchListComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.researchContractManagementSearch
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      },
      {
        path: "authentication",
        component: ContractSearchAuthenticationComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.researchContractManagementAuthen
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
export class ContractSearchRoutingModule {}
