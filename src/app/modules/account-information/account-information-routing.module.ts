import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout';
import { AccountInformationComponent } from './pages';
import { AuthorizeGuard, UnsavedChangesGuard, NavigationGuard } from '@app/core/guards';
import { PERMISSIONS } from '@app/shared/constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AccountInformationComponent,
        canActivate: [ AuthorizeGuard ],
        data: {
          expectedPermission: PERMISSIONS.accountManagement
        },
        canDeactivate: [ UnsavedChangesGuard, NavigationGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountInformationRoutingModule { }
