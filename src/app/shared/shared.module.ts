import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import {
  AuthenticationService,
  FileSignService,
  EmployeeService,
  FileUploadEmitter
} from '@app/core/services';

import {
  LayoutComponent,
  AuthLayoutComponent
} from './layout';

import {
  InputLabelComponent,
  UsersTreeComponent,
  PaginationComponent,
  ButtonDeleteComponent,
  TableEditorErrorsComponent,
  DepartmentComponent,
  ManageUnitFormComponent,
  AcountFormComponent,
  EmailFormComponent,
  ContractComponent,
  FileAttachmentComponent,
  UploadFormComponent,
  TableInportErrorsComponent,
  SignaturePadComponent,
  ImageBaseComponent,
  SignatureFlowComponent,
  SignatureFlowS2Component,
  SignatureFlowS3Component,
  SignatureFlowSaveComponent,
  SignatureUploadFileComponent,
  FormEployeeSingComponent,
  DialogErrorComponent,
  PdfListThumbnailComponent,
  PdfViewComponent,
  FormDocumentComponent,
  DialogUploadTemplateErrorComponent,
  DialogThreadSingTemplateComponent,
  ClientSuggestionComponent,
  DialogCustomerComponent,
  DialogClientUploadComponent,
  ChangePasswordComponent,
  CompnayInfoComponent,
  DialogHSMConfigComponent,
  DialogEmailConfigComponent,
  DialogSMSConfigComponent,
  DialogApiContractOutComponent,
  DialogChangePasswordComponent,
  RefuseComponent
} from './components';

import {
  CardFullHeightDirective,
  EditorAutoSizeDirective,
  PluploadDirective,
  PluploadExcelDirective,
  SignDocumentFullHeightDirective,
  SignDocument2FullHeightDirective,
  PdfViewerFullHeightDirective
} from './directives';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzButtonModule,
    NzDatePickerModule,
    DragDropModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzModalModule,
    NzSelectModule,
    NzSpinModule,
    NzRadioModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzTabsModule,
    NzTreeModule,
    NzTableModule,
    NzToolTipModule,
    SignaturePadModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    AuthLayoutComponent,
    InputLabelComponent,
    UsersTreeComponent,
    PaginationComponent,
    ButtonDeleteComponent,
    TableEditorErrorsComponent,
    CardFullHeightDirective,
    EditorAutoSizeDirective,
    PluploadDirective,
    PluploadExcelDirective,
    SignDocumentFullHeightDirective,
    SignDocument2FullHeightDirective,
    PdfViewerFullHeightDirective,
    ManageUnitFormComponent,
    DepartmentComponent,
    AcountFormComponent,
    EmailFormComponent,
    ContractComponent,
    FileAttachmentComponent,     
    UploadFormComponent,
    TableInportErrorsComponent,
    SignaturePadComponent,
    ImageBaseComponent,
    SignatureFlowComponent,
    SignatureFlowS2Component,
    SignatureFlowS3Component,
    SignatureFlowSaveComponent,
    SignatureUploadFileComponent,
    FormEployeeSingComponent,
    DialogErrorComponent,
    PdfListThumbnailComponent,
    PdfViewComponent,
    FormDocumentComponent,
    DialogUploadTemplateErrorComponent,
    DialogThreadSingTemplateComponent,
    ClientSuggestionComponent,
    DialogCustomerComponent,
    DialogClientUploadComponent,
    ChangePasswordComponent,
    CompnayInfoComponent,
    DialogHSMConfigComponent,
    DialogEmailConfigComponent,
    DialogSMSConfigComponent,
    DialogApiContractOutComponent,
    DialogChangePasswordComponent,
    RefuseComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputLabelComponent,
    UsersTreeComponent,
    PaginationComponent,
    ButtonDeleteComponent,
    TableEditorErrorsComponent,
    CardFullHeightDirective,
    EditorAutoSizeDirective,
    PluploadDirective,
    PluploadExcelDirective,
    SignDocumentFullHeightDirective,
    SignDocument2FullHeightDirective,
    PdfViewerFullHeightDirective,
    NzCheckboxModule,
    NzToolTipModule,
    ManageUnitFormComponent,
    DepartmentComponent,
    ContractComponent,
    FileAttachmentComponent,     
    UploadFormComponent,
    TableInportErrorsComponent,
    SignaturePadComponent,
    ImageBaseComponent,
    SignatureFlowComponent,
    SignatureFlowS2Component,
    SignatureFlowS3Component,
    SignatureFlowSaveComponent,
    SignatureUploadFileComponent,
    FormEployeeSingComponent,
    DialogErrorComponent,
    PdfListThumbnailComponent,
    PdfViewComponent,
    FormDocumentComponent,
    DialogUploadTemplateErrorComponent,
    DialogThreadSingTemplateComponent,
    ClientSuggestionComponent,
    DialogCustomerComponent,
    DialogClientUploadComponent,
    ChangePasswordComponent,
    CompnayInfoComponent,
    DialogHSMConfigComponent,
    DialogEmailConfigComponent,
    DialogSMSConfigComponent,
    DialogApiContractOutComponent,
    DialogChangePasswordComponent,
    RefuseComponent
  ],
  providers: [
    AuthenticationService,
    FileSignService,
    EmployeeService,
    FileUploadEmitter
  ],
  entryComponents: [
    TableEditorErrorsComponent,
    ManageUnitFormComponent,
    AcountFormComponent,
    EmailFormComponent,
    ContractComponent,
    FileAttachmentComponent,     
    UploadFormComponent,
    TableInportErrorsComponent,
    SignaturePadComponent,
    ImageBaseComponent,
    SignatureFlowComponent,
    SignatureFlowS2Component,
    SignatureFlowS3Component,
    SignatureFlowSaveComponent,
    SignatureUploadFileComponent,
    FormEployeeSingComponent,
    DialogErrorComponent,
    DialogUploadTemplateErrorComponent,
    DialogThreadSingTemplateComponent,
    DialogCustomerComponent,
    DialogClientUploadComponent,
    ChangePasswordComponent,
    CompnayInfoComponent,
    DialogHSMConfigComponent,
    DialogEmailConfigComponent,
    DialogSMSConfigComponent,
    DialogApiContractOutComponent,
    DialogChangePasswordComponent,
    RefuseComponent
  ]
})
export class SharedModule { }
