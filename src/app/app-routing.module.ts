import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    loadChildren: './modules/categories/categories.module#CategoriesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'company',
    loadChildren: './modules/company/company.module#CompanyModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'contract',
    loadChildren: './modules/contract/contract.module#ContractModule',
    canActivate: [AuthGuard],
  },

  {
    path: 'employees',
    loadChildren: './modules/employees/employees.module#EmployeesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    loadChildren: './modules/customers/customers.module#CustomersModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'account-management',
    loadChildren: './modules/system/accounts-management/accounts.module#AccountsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: './modules/system/products/products.module#ProductsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'emails-notification',
    loadChildren: './modules/system/emails-notification/emails-notification.module#EmailsNotificationModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'register-ivan',
    loadChildren: './modules/register-ivan/register-ivan.module#RegisterIvanModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadChildren: './modules/system/search/search.module#SearchModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'account-information',
    loadChildren: './modules/account-information/account-information.module#AccountInformationModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-documents',
    loadChildren: './modules/documents/documents.module#DocumentsModule',
    canActivate: [AuthGuard],
  },
  {
    path: "cai-dat-chung",
    loadChildren:
      "./modules/system/general-settings/general-settings.module#GeneralSettingsModule",
  },
  {
    path: "manage-template-documents",
    loadChildren:
      "./modules/manage-template-documents/manage-template-documents.module#ManageTemplateDocumentsModule",
  },
  {
    path: "system-settings",
    loadChildren:
      "./modules/system/system-settings/system-settings.module#SystemSettingsModule",
  },
  {
    path: "plugin-settings",
    loadChildren:
      "./modules/system/plugin-settings/plugin-settings.module#PluginSettingsModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
