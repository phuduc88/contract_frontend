"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DraggableEventDirective = void 0;
var core_1 = require("@angular/core");
var DraggableEventDirective = /** @class */ (function () {
    function DraggableEventDirective(_ngZone, el) {
        this._ngZone = _ngZone;
        this.el = el;
        this.event = 'dragover';
        this.emitter = new core_1.EventEmitter();
    }
    DraggableEventDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            var nativeElement = _this.el.nativeElement;
            _this._handler = function ($event) {
                _this.emitter.emit($event);
            };
            nativeElement.addEventListener(_this.event, _this._handler, false);
        });
    };
    DraggableEventDirective.prototype.ngOnDestroy = function () {
        this.el.nativeElement.removeEventListener(this.event, this._handler);
    };
    __decorate([
        core_1.Input()
    ], DraggableEventDirective.prototype, "event");
    __decorate([
        core_1.Output()
    ], DraggableEventDirective.prototype, "emitter");
    DraggableEventDirective = __decorate([
        core_1.Directive({
            selector: '[appDraggableEvent]'
        })
    ], DraggableEventDirective);
    return DraggableEventDirective;
}());
exports.DraggableEventDirective = DraggableEventDirective;
