"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractSearchModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ngx_mask_1 = require("ngx-mask");
var button_1 = require("ng-zorro-antd/button");
var date_picker_1 = require("ng-zorro-antd/date-picker");
var form_1 = require("ng-zorro-antd/form");
var icon_1 = require("ng-zorro-antd/icon");
var input_1 = require("ng-zorro-antd/input");
var grid_1 = require("ng-zorro-antd/grid");
var modal_1 = require("ng-zorro-antd/modal");
var select_1 = require("ng-zorro-antd/select");
var table_1 = require("ng-zorro-antd/table");
var spin_1 = require("ng-zorro-antd/spin");
var upload_1 = require("ng-zorro-antd/upload");
var radio_1 = require("ng-zorro-antd/radio");
var checkbox_1 = require("ng-zorro-antd/checkbox");
var services_1 = require("@app/core/services");
var shared_module_1 = require("@app/shared/shared.module");
var contract_search_routing_module_1 = require("./contract-search-routing.module");
var pages_1 = require("./pages");
var ContractSearchModule = /** @class */ (function () {
    function ContractSearchModule() {
    }
    ContractSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                button_1.NzButtonModule,
                date_picker_1.NzDatePickerModule,
                form_1.NzFormModule,
                icon_1.NzIconModule,
                input_1.NzInputModule,
                grid_1.NzGridModule,
                modal_1.NzModalModule,
                select_1.NzSelectModule,
                spin_1.NzSpinModule,
                upload_1.NzUploadModule,
                table_1.NzTableModule,
                radio_1.NzRadioModule,
                checkbox_1.NzCheckboxModule,
                contract_search_routing_module_1.ContractSearchRoutingModule,
                shared_module_1.SharedModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
            ],
            declarations: [
                pages_1.ContractSearchComponent,
                pages_1.ContractSearchListComponent,
                pages_1.ContractSearchFormComponent,
                pages_1.ContractSearchTableComponent,
                pages_1.ContractSearchAuthenticationComponent,
                pages_1.ContractAuthenticationProcessS1Component,
                pages_1.ContractAuthenticationProcessS2Component,
                pages_1.ContractAuthenticationInfoComponent,
            ],
            providers: [services_1.AuthenticationService],
            entryComponents: []
        })
    ], ContractSearchModule);
    return ContractSearchModule;
}());
exports.ContractSearchModule = ContractSearchModule;
