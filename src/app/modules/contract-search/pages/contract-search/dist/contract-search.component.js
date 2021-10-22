"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractSearchComponent = void 0;
var core_1 = require("@angular/core");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var ContractSearchComponent = /** @class */ (function () {
    function ContractSearchComponent() {
        this.curentStep = 1;
    }
    ContractSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.handlers = [
            event_emitter_1.eventEmitter.on("contract:nextStep", function (_a) {
                var step = _a.step;
                _this.curentStep = step;
            }),
        ];
    };
    ContractSearchComponent.prototype.ngOnDestroy = function () {
        event_emitter_1.eventEmitter.destroy(this.handlers);
    };
    ContractSearchComponent = __decorate([
        core_1.Component({
            selector: "app-contract-search",
            templateUrl: "./contract-search.component.html",
            styleUrls: ["./contract-search.component.less"]
        })
    ], ContractSearchComponent);
    return ContractSearchComponent;
}());
exports.ContractSearchComponent = ContractSearchComponent;
