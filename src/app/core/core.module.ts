import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  AuthenticationService,
  EmployeeService,
  CompanyService,
  FileSignService,
  DocumentTypeService,
  AgencieService,
  NavigationService,
  ProductService,
  FileUploadEmitter,
  RoleService,
  ContractService,
  SignOfUserService,
  SignFlowService,
  ThreadGroupService,
  ThreadedSignTemplateService,
} from './services';

@NgModule({
  imports: [],
  providers: [
    AuthenticationService,
    CompanyService,
    EmployeeService,
    FileSignService,
    NavigationService,
    DocumentTypeService,
    AgencieService,
    ProductService,
    FileUploadEmitter,
    RoleService,
    ContractService,
    SignOfUserService,
    SignFlowService,
    ThreadGroupService,
    ThreadedSignTemplateService,
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
