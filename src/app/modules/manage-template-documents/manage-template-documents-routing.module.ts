import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PERMISSIONS } from '@app/shared/constant';
import { LayoutComponent } from "@app/shared/layout";
import { ManageTemplateDocumentsComponent } from "./pages";
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: ManageTemplateDocumentsComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.documentTemplateManagement
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
export class ManageTemplateDocumentsRoutingModule {}
