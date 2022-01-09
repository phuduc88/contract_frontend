import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PERMISSIONS } from '@app/shared/constant';
import { LayoutComponent } from '@app/shared/layout';
import { DocumentsComponent, DocumentDetailComponent } from './pages';
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DocumentsComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.contractManagement
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      },
      {
        path: ":id",
        component: DocumentDetailComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.contractManagementViewDetail
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule { }
