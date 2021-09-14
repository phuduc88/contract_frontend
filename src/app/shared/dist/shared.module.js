"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var forms_1 = require("@angular/forms");
var ngx_mask_1 = require("ngx-mask");
var tooltip_1 = require("ng-zorro-antd/tooltip");
var button_1 = require("ng-zorro-antd/button");
var date_picker_1 = require("ng-zorro-antd/date-picker");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var dropdown_1 = require("ng-zorro-antd/dropdown");
var form_1 = require("ng-zorro-antd/form");
var grid_1 = require("ng-zorro-antd/grid");
var icon_1 = require("ng-zorro-antd/icon");
var input_1 = require("ng-zorro-antd/input");
var input_number_1 = require("ng-zorro-antd/input-number");
var modal_1 = require("ng-zorro-antd/modal");
var select_1 = require("ng-zorro-antd/select");
var spin_1 = require("ng-zorro-antd/spin");
var radio_1 = require("ng-zorro-antd/radio");
var checkbox_1 = require("ng-zorro-antd/checkbox");
var table_1 = require("ng-zorro-antd/table");
var pagination_1 = require("ng-zorro-antd/pagination");
var tabs_1 = require("ng-zorro-antd/tabs");
var tree_1 = require("ng-zorro-antd/tree");
var services_1 = require("@app/core/services");
var layout_1 = require("./layout");
var components_1 = require("./components");
var directives_1 = require("./directives");
var angular2_signaturepad_1 = require("angular2-signaturepad");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule,
                button_1.NzButtonModule,
                date_picker_1.NzDatePickerModule,
                drag_drop_1.DragDropModule,
                dropdown_1.NzDropDownModule,
                form_1.NzFormModule,
                grid_1.NzGridModule,
                icon_1.NzIconModule,
                input_1.NzInputModule,
                input_number_1.NzInputNumberModule,
                modal_1.NzModalModule,
                select_1.NzSelectModule,
                spin_1.NzSpinModule,
                radio_1.NzRadioModule,
                checkbox_1.NzCheckboxModule,
                pagination_1.NzPaginationModule,
                tabs_1.NzTabsModule,
                tree_1.NzTreeModule,
                table_1.NzTableModule,
                tooltip_1.NzToolTipModule,
                angular2_signaturepad_1.SignaturePadModule,
                ngx_mask_1.NgxMaskModule.forRoot()
            ],
            declarations: [
                layout_1.LayoutComponent,
                layout_1.AuthLayoutComponent,
                components_1.InputLabelComponent,
                components_1.UsersTreeComponent,
                components_1.PaginationComponent,
                components_1.ButtonDeleteComponent,
                components_1.TableEditorErrorsComponent,
                directives_1.CardFullHeightDirective,
                directives_1.EditorAutoSizeDirective,
                directives_1.PluploadDirective,
                directives_1.PluploadExcelDirective,
                directives_1.SignDocumentFullHeightDirective,
                directives_1.SignDocument2FullHeightDirective,
                components_1.ManageUnitFormComponent,
                components_1.DepartmentComponent,
                components_1.AcountFormComponent,
                components_1.EmailFormComponent,
                components_1.ContractComponent,
                components_1.FileAttachmentComponent,
                components_1.DeclarationResultComponent,
                components_1.DeclarationResultOfCompanyComponent,
                components_1.DeclarationResultDetailComponent,
                components_1.UploadFormComponent,
                components_1.TableInportErrorsComponent,
                components_1.SignaturePadComponent,
                components_1.ImageBaseComponent,
                components_1.SignatureFlowComponent,
                components_1.SignatureFlowS2Component,
                components_1.SignatureFlowS3Component,
                components_1.SignatureFlowSaveComponent,
                components_1.SignatureUploadFileComponent,
                components_1.FormEployeeSingComponent,
                components_1.DialogErrorComponent,
                components_1.PdfListThumbnailComponent,
                components_1.PdfViewComponent,
            ],
            exports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule,
                components_1.InputLabelComponent,
                components_1.UsersTreeComponent,
                components_1.PaginationComponent,
                components_1.ButtonDeleteComponent,
                components_1.TableEditorErrorsComponent,
                directives_1.CardFullHeightDirective,
                directives_1.EditorAutoSizeDirective,
                directives_1.PluploadDirective,
                directives_1.PluploadExcelDirective,
                directives_1.SignDocumentFullHeightDirective,
                directives_1.SignDocument2FullHeightDirective,
                checkbox_1.NzCheckboxModule,
                tooltip_1.NzToolTipModule,
                components_1.ManageUnitFormComponent,
                components_1.DepartmentComponent,
                components_1.ContractComponent,
                components_1.FileAttachmentComponent,
                components_1.DeclarationResultComponent,
                components_1.DeclarationResultOfCompanyComponent,
                components_1.DeclarationResultDetailComponent,
                components_1.UploadFormComponent,
                components_1.TableInportErrorsComponent,
                components_1.SignaturePadComponent,
                components_1.ImageBaseComponent,
                components_1.SignatureFlowComponent,
                components_1.SignatureFlowS2Component,
                components_1.SignatureFlowS3Component,
                components_1.SignatureFlowSaveComponent,
                components_1.SignatureUploadFileComponent,
                components_1.FormEployeeSingComponent,
                components_1.DialogErrorComponent,
                components_1.PdfListThumbnailComponent,
                components_1.PdfViewComponent,
            ],
            providers: [
                services_1.AuthenticationService,
                services_1.FileSignService,
                services_1.EmployeeService,
                services_1.FileUploadEmitter
            ],
            entryComponents: [
                components_1.TableEditorErrorsComponent,
                components_1.ManageUnitFormComponent,
                components_1.AcountFormComponent,
                components_1.EmailFormComponent,
                components_1.ContractComponent,
                components_1.FileAttachmentComponent,
                components_1.DeclarationResultComponent,
                components_1.DeclarationResultOfCompanyComponent,
                components_1.DeclarationResultDetailComponent,
                components_1.UploadFormComponent,
                components_1.TableInportErrorsComponent,
                components_1.SignaturePadComponent,
                components_1.ImageBaseComponent,
                components_1.SignatureFlowComponent,
                components_1.SignatureFlowS2Component,
                components_1.SignatureFlowS3Component,
                components_1.SignatureFlowSaveComponent,
                components_1.SignatureUploadFileComponent,
                components_1.FormEployeeSingComponent,
                components_1.DialogErrorComponent,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
