"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PdfViewComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("@app/shared/constant");
var pdfjs_dist_1 = require("pdfjs-dist");
var event_emitter_1 = require("@app/shared/utils/event-emitter");
var sign_1 = require("@app/shared/utils/sign");
var fabric_1 = require("fabric");
var $ = require("jquery");
require("jqueryui");
var PdfViewComponent = /** @class */ (function () {
    function PdfViewComponent() {
        this.x = constant_1.SIGNATURE.X;
        this.y = constant_1.SIGNATURE.Y;
        this.zoomX = 0.7;
        this.objectSelect = {
            isUpdate: false,
            page: 1
        };
        this.canvasFs = [];
        this.height = 0;
        this.pageNum = 1;
        this.pageRendering = false;
        this.totalPage = 0;
        var pdfWorkerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + pdfjs_dist_1.version + "/pdf.worker.min.js";
        pdfjs_dist_1.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
    }
    PdfViewComponent.prototype.ngOnDestroy = function () {
        event_emitter_1.eventEmitter.destroy(this.handlers);
    };
    PdfViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.documentSign.myselfSign) {
            this.emailAssignment = this.documentSign.emailAssignment;
        }
        this.handlers = [
            event_emitter_1.eventEmitter.on('pdf:View', function (_a) {
                var fileSign = _a.fileSign, employeesSign = _a.employeesSign;
                _this.currentFile = fileSign;
                _this.loadPdfViewer(fileSign, employeesSign, _this.disableLoading);
            }),
            event_emitter_1.eventEmitter.on("sign:setPageNumerByThumb", function (number) {
                _this.pageNum = number;
                _this.queueRenderPage(number);
            }),
            event_emitter_1.eventEmitter.on('sign:changeEmailAssignment', function (employeesSign) {
                _this.emailAssignment = employeesSign.email;
                _this.employeeSign = employeesSign;
            }),
            event_emitter_1.eventEmitter.on('sign:selection', function (sign) {
                _this.setSignSelection(sign);
            })
        ];
    };
    PdfViewComponent.prototype.createPageViewer = function (canvas, ctx, page, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var viewport, renderContext, renderTask, pageViewer;
            return __generator(this, function (_a) {
                viewport = page.getViewport({ scale: constant_1.SIGNATURE.PDF_SCALE });
                //Render PDF page into canvas context
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                ;
                canvas.style.width = "100%";
                canvas.id = constant_1.SIGNATURE.SUFFIX_VIEW_ID + pageNumber;
                canvas.className = 'viewer_style';
                this.height = viewport.height;
                renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                // catch event drop signature
                this.droppableHandleCanvas(canvas, pageNumber);
                renderTask = page.render(renderContext);
                this.pdfpromise(renderTask, canvas, viewport);
                pageViewer = document.createElement('div');
                if ($('#' + canvas.id).length == 0) {
                    pageViewer.className = 'page-viewer';
                    pageViewer.appendChild(canvas);
                }
                return [2 /*return*/, pageViewer];
            });
        });
    };
    PdfViewComponent.prototype.loadPdfViewer = function (fileSign, employeesSign, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, pdfDoc, i, canvas, ctx, page, pageView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.canvasFs = [];
                        $('.pdf-loading').css('display', 'block');
                        this.pdfViewer.nativeElement.innerHTML = '';
                        data = atob(fileSign.data);
                        return [4 /*yield*/, pdfjs_dist_1.getDocument({ data: data }).promise];
                    case 1:
                        pdfDoc = _a.sent();
                        this.totalPage = pdfDoc.numPages;
                        // init event scroll
                        this.initScroll(pdfDoc);
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i < pdfDoc.numPages + 1)) return [3 /*break*/, 6];
                        canvas = document.createElement('canvas');
                        ctx = canvas.getContext('2d');
                        return [4 /*yield*/, pdfDoc.getPage(i)];
                    case 3:
                        page = _a.sent();
                        return [4 /*yield*/, this.createPageViewer(canvas, ctx, page, i)];
                    case 4:
                        pageView = _a.sent();
                        this.pdfViewer.nativeElement.appendChild(pageView);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        this.initFabicObject();
                        callback();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Phước thức kéo thả chữ ký
    PdfViewComponent.prototype.droppableHandleCanvas = function (canvas, pageNumber) {
        var that = this;
        $(canvas).droppable({
            drop: function (event, ui) {
                if (!that.emailAssignment) {
                    event_emitter_1.eventEmitter.emit("sign:NotEmailAssignment", false);
                    return false;
                }
                if (ui.draggable != ui.helper) {
                    var scrollTop = $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).scrollTop();
                    var top_1 = ui.position.top + scrollTop;
                    var left_1 = ui.position.left - $(this).offset().left;
                    var width_1 = constant_1.SIGNATURE.WIDTH_ICON * constant_1.SIGNATURE.PDF_SCALE;
                    var height_1 = constant_1.SIGNATURE.HEIGHT_ICON * constant_1.SIGNATURE.PDF_SCALE;
                    var isinitial_1 = false;
                    // let data_image = ui.helper[0].attributes['data-image'].value;
                    // if (data_image == 'initial_signature') {
                    //   isinitial = true;
                    //   console.log('xxxxxxx',isinitial);
                    //   width = 82 * SIGNATURE.PDF_SCALE;
                    //   height = 40 * SIGNATURE.PDF_SCALE;
                    // }
                    var img_1 = that.generateSignImg(ui, width_1, height_1);
                    var signType_1 = 1; //img.attributes['src'].value.includes('sign-icon.svg') ? 1 : 0;
                    //duyệt từng page
                    var calHeight_1 = 0;
                    that.canvasFs.forEach(function (item, index) {
                        if (item.index < pageNumber) {
                            calHeight_1 += item.canvasF.height + constant_1.SIGNATURE.INTMARGIN / constant_1.SIGNATURE.PDF_SCALE;
                        }
                    });
                    var signIndex_1 = constant_1.SIGNATURE.SIGN_NUM++;
                    top_1 = ((top_1 - calHeight_1) / that.zoomX) - 50;
                    left_1 = left_1 / that.zoomX;
                    var id_1 = $(this).attr('id');
                    if (that.canvasFs && that.canvasFs.length > 0) {
                        that.canvasFs.forEach(function (item, index) {
                            if (item.id == id_1) {
                                that.addSign(item.canvasF, img_1, top_1, left_1, width_1, height_1, constant_1.SIGNATURE.SX_DEFAULT, constant_1.SIGNATURE.SX_DEFAULT, sign_1["default"].createGuid(), true, isinitial_1, signType_1, signIndex_1, that.emailAssignment);
                            }
                        });
                    }
                }
            }
        });
    };
    PdfViewComponent.prototype.addSign = function (canvas, img, top, left, width, height, scaleX, scaleY, privateId, hasmakeRequest, isinitial, signType, signindex, emailAssignment) {
        var _a;
        var that = this;
        scaleX = scaleX || 1;
        scaleY = scaleY || 1;
        (_a = that.reMathTopLeft(top, left, width, height, scaleX, scaleY, canvas), top = _a.top, left = _a.left);
        var option = {
            left: left,
            top: top,
            width: width,
            height: height,
            targetFindTolerance: 2,
            objectCaching: false
        };
        setTimeout(function () {
            that.addsigntodoc(img, option, scaleX, scaleY, canvas, privateId, hasmakeRequest, isinitial, signType, signindex, emailAssignment);
        }, 100);
    };
    PdfViewComponent.prototype.addsigntodoc = function (img, option, scaleX, scaleY, canvas, privateId, hasmakeRequest, isinitial, signType, signIndex, emailAssignment) {
        var pageIndex = parseInt((canvas.pageIndex || '1'));
        var rect = new fabric_1.fabric.Image(img, option);
        rect.scaleX = scaleX;
        rect.scaleY = scaleY;
        rect.privateId = privateId;
        rect.page = pageIndex;
        rect.privateImg = img;
        rect.isinitial = isinitial;
        rect.signType = signType;
        rect.signIndex = signIndex;
        rect.emailAssignment = emailAssignment;
        rect.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            tl: false,
            tr: false,
            mtr: false
        });
        canvas.add(rect);
        if (hasmakeRequest) {
            canvas.setActiveObject(rect);
            var sign = {
                page: pageIndex,
                coordinateY: option.top,
                coordinateX: option.left,
                signType: signType,
                height: option.height,
                width: option.width,
                privateId: privateId,
                signIndex: signIndex,
                emailAssignment: emailAssignment,
                scaleX: scaleX,
                scaleY: scaleY,
                img: img,
                isinitial: isinitial,
                name: this.currentFile.fileName,
                fileSignId: this.currentFile.id,
                scale: scaleX
            };
            event_emitter_1.eventEmitter.emit("sign:add", sign);
        }
        canvas.requestRenderAll();
    };
    PdfViewComponent.prototype.reMathTopLeft = function (top, left, width, height, scaleX, scaleY, canvas) {
        var _containorW = canvas.width / this.zoomX;
        var _containorH = canvas.height / this.zoomX;
        if (left + width * scaleY > _containorW) {
            left = left - ((left + width * scaleY) - _containorW) - constant_1.SIGNATURE.INTMARGIN;
        }
        if (left <= constant_1.SIGNATURE.INTMARGIN) {
            left = constant_1.SIGNATURE.INTMARGIN;
        }
        if (top <= constant_1.SIGNATURE.INTMARGIN) {
            top = constant_1.SIGNATURE.INTMARGIN;
        }
        if (top > constant_1.SIGNATURE.INTMARGIN && top + height * scaleX > _containorH - constant_1.SIGNATURE.INTMARGIN) {
            top = top - ((top + height * scaleX) - _containorH) - constant_1.SIGNATURE.INTMARGIN;
        }
        return { top: top, left: left };
    };
    PdfViewComponent.prototype.generateSignImg = function (ui, width, height) {
        var img = document.createElement('img');
        if (!this.documentSign.myselfSign) {
            img.src = this.getBackgroundImageUrl($(ui.helper));
            return img;
        }
        img.src = sign_1["default"].convertBase64ToImage(this.currentUser.signatureImage);
        var option = {
            width: width,
            height: height
        };
        sign_1["default"].resize2img(img, option, 'png', function (result) {
            img.src = result;
        });
        return img;
    };
    PdfViewComponent.prototype.getBackgroundImageUrl = function ($element) {
        if (!($element instanceof jQuery)) {
            $element = $($element);
        }
        var imageUrl = $element.css('background-image');
        return imageUrl.replace(/(url\(|\)|'|")/gi, ''); // Strip everything but the url itself
    };
    PdfViewComponent.prototype.pdfpromise = function (renderTask, canvas, viewport) {
        var that = this;
        renderTask.promise.then(function () {
            var bg = canvas.toDataURL("image/png");
            var fcanvas = new fabric_1.fabric.Canvas(canvas.id, {
                selection: false
            });
            fcanvas.setBackgroundImage(bg, fcanvas.renderAll.bind(fcanvas));
            fcanvas.setZoom(that.zoomX);
            fcanvas.setWidth(viewport.width * that.zoomX);
            fcanvas.setHeight(viewport.height * that.zoomX);
            fcanvas.renderAndReset();
            fcanvas.pageIndex = canvas.id.split('_')[1];
            var obj = {
                canvasF: fcanvas,
                id: canvas.id,
                index: parseInt(fcanvas.pageIndex),
                size: { width: viewport.width, height: viewport.height }
            };
            var index = canvas.id.split('_')[1];
            //Các sự kiện trên canvas
            that.handleObjectInCanvas(fcanvas, index);
            that.loadSign(fcanvas);
            that.canvasFs.push(obj);
        });
    };
    PdfViewComponent.prototype.loadSign = function (fcanvas) {
        var _this = this;
        // this.currentFile.id
        var lsSign = this.documentSign.listSign.filter(function (sign) { return sign.fileSignId === _this.currentFile.id; });
        if (lsSign && lsSign.length > 0) {
            lsSign.forEach(function (sign) {
                if (fcanvas.pageIndex == sign.page) {
                    _this.addSign(fcanvas, sign.img, sign.coordinateY, // * sign.scale * SIGNATURE.PDF_SCALE,
                    sign.coordinateX, // * sign.scale * SIGNATURE.PDF_SCALE,
                    sign.width, sign.height, sign.scale, sign.scale, sign.privateId, false, sign.isinitial, sign.signType, sign.signIndex, sign.emailAssignment);
                }
            });
        }
    };
    PdfViewComponent.prototype.handleObjectInCanvas = function (fcanvas, index) {
        var that = this;
        fcanvas.on({
            'mouse:down': function (e) {
                if (!e.target) {
                    that.x = e.pointer.x;
                    that.y = e.pointer.y;
                }
            }
        });
        fcanvas.on({
            'mouse:move': function (e) {
                if (!e.target && that.x > -1 && that.y > -1) {
                    var _y = that.y - e.pointer.y;
                    var _x = that.x - e.pointer.x;
                    var sctop = $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).scrollTop() + _y;
                    var scleft = $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).scrollLeft() + _x;
                    $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).scrollTop(sctop);
                    $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).scrollLeft(scleft);
                }
            }
        });
        fcanvas.on({
            'mouse:up': function (e) {
                that.x = -1;
                that.y = -1;
            }
        });
        fcanvas.on({
            'selection:cleared': function (e) {
                that.clearSignProperties();
            }
        });
        fcanvas.on({
            'selection:created': function (e) {
                console.log('selection:created');
                that.objectSelect = e.selected[0];
                that.objectSelect.isUpdate = true;
                that.setSignProperties(that.objectSelect);
            }
        });
        fcanvas.on({
            'selection:updated': function (e) {
                console.log('selection:updated');
                that.objectSelect = e.selected[0];
                that.objectSelect.isUpdate = true;
                that.setSignProperties(that.objectSelect, true);
            }
        });
        fcanvas.on({
            'object:moving': function (e) {
                console.log('selection:moving');
                that.fixedDragOut(this, e, index, true);
            }
        });
        fcanvas.on({
            'object:moved': function (e) {
                console.log('selection:moved');
                that.fixedDragOut(this, e, index, false);
                e.target.isUpdate = true;
                that.setSignProperties(e.target, true);
            }
        });
        fcanvas.on({
            'object:scaling': function (e) {
                console.log('selection:scaling');
                var objSelect = e.transform.target;
                that.fixScaleSize(objSelect);
            }
        });
    };
    PdfViewComponent.prototype.setSignProperties = function (obj, isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
        obj.isUpdate = isUpdate;
        event_emitter_1.eventEmitter.emit("sign:set-properties", obj);
    };
    PdfViewComponent.prototype.fixScaleSize = function (objSelect) {
        var canvas = objSelect.canvas;
        var _containerW = canvas.width / this.zoomX;
        var _containerH = canvas.height / this.zoomX;
        if (objSelect.left + objSelect.width * objSelect.scaleX > _containerW - constant_1.SIGNATURE.INTMARGIN) {
            objSelect.scaleY = objSelect.scaleX = (_containerW - constant_1.SIGNATURE.INTMARGIN - objSelect.left) / objSelect.width;
        }
        if (objSelect.top + objSelect.height * objSelect.scaleX > _containerH - constant_1.SIGNATURE.INTMARGIN) {
            objSelect.scaleY = objSelect.scaleX = (_containerH - constant_1.SIGNATURE.INTMARGIN - objSelect.top) / objSelect.height;
        }
        if (objSelect.scaleX < constant_1.SIGNATURE.MINSCALE) {
            objSelect.scaleY = objSelect.scaleX = constant_1.SIGNATURE.MINSCALE;
        }
        else if (objSelect.scaleX > constant_1.SIGNATURE.MAXSCALE) {
            objSelect.scaleY = objSelect.scaleX = constant_1.SIGNATURE.MAXSCALE;
        }
        // objSelect.isUpdate = true;
        // this.setSignProperties(objSelect)
    };
    PdfViewComponent.prototype.fixedDragOut = function (curent, e, index, dragNPPage) {
        var objSelect = e.target;
        var scaleX = objSelect.scaleX || constant_1.SIGNATURE.SX_DEFAULT;
        var scaleY = objSelect.scaleY || constant_1.SIGNATURE.SX_DEFAULT;
        var containerHeight = curent.height / this.zoomX;
        var containerWidth = curent.width / this.zoomX;
        var objPositionBottom = objSelect.top + objSelect.height * objSelect.scaleY;
        var objPositionRight = objSelect.left + objSelect.width * objSelect.scaleX;
        var contentBottom = containerHeight - constant_1.SIGNATURE.INTMARGIN - objSelect.height * objSelect.scaleX;
        var contentRigth = containerWidth - constant_1.SIGNATURE.INTMARGIN - objSelect.width * objSelect.scaleX;
        var notePrev;
        var noteNext;
        var prevId = constant_1.SIGNATURE.SUFFIX_VIEW_ID + (parseInt(objSelect.page) - 1);
        var nextId = constant_1.SIGNATURE.SUFFIX_VIEW_ID + (parseInt(objSelect.page) + 1);
        this.canvasFs.forEach(function (item, index) {
            if (item.id == prevId) {
                notePrev = item.canvasF;
            }
            if (item.id == nextId) {
                noteNext = item.canvasF;
            }
        });
        // drap top
        if (objSelect.top < -objSelect.height / 2 ||
            ((!notePrev || !dragNPPage) && objSelect.top < constant_1.SIGNATURE.INTMARGIN)) {
            if (notePrev && dragNPPage) {
                var contentBottomPrev = notePrev.height / this.zoomX - constant_1.SIGNATURE.INTMARGIN - objSelect.height * objSelect.scaleX;
                var leftPrev = objSelect.left * ((notePrev.width / this.zoomX) / containerWidth);
                this.addSign(notePrev, objSelect._element, contentBottomPrev, leftPrev, objSelect.width, objSelect.height, scaleX, scaleY, objSelect.privateId, true, objSelect.isinitial, objSelect.signType, objSelect.signIndex, objSelect.emailAssignment);
                curent.remove(objSelect);
            }
            else {
                objSelect.top = constant_1.SIGNATURE.INTMARGIN;
            }
        }
        // drap left
        if (objPositionRight + constant_1.SIGNATURE.INTMARGIN >= containerWidth) {
            objSelect.left = contentRigth;
        }
        // drap right
        if (objSelect.left < constant_1.SIGNATURE.INTMARGIN) {
            objSelect.left = constant_1.SIGNATURE.INTMARGIN;
        }
        // drap bottom
        if ((objPositionBottom - (objSelect.height / 2)) >= containerHeight ||
            ((!noteNext || !dragNPPage) && objPositionBottom + constant_1.SIGNATURE.INTMARGIN >= containerHeight)) {
            if (noteNext && dragNPPage) {
                var leftNext = objSelect.left * ((noteNext.width / this.zoomX) / containerWidth);
                this.addSign(noteNext, objSelect._element, constant_1.SIGNATURE.INTMARGIN, leftNext, objSelect.width, objSelect.height, scaleX, scaleY, objSelect.privateId, true, objSelect.isinitial, objSelect.signType, objSelect.signIndex, objSelect.emailAssignment);
                curent.remove(objSelect);
            }
            else {
                objSelect.top = contentBottom;
            }
        }
        curent.requestRenderAll();
    };
    PdfViewComponent.prototype.clearSignProperties = function () {
        event_emitter_1.eventEmitter.emit("sign:clear-properties");
    };
    PdfViewComponent.prototype.initScroll = function (pdfDoc) {
        var that = this;
        $(constant_1.SIGNATURE.SELECTOR.ScrollViewer).on("scroll", function () {
            var scrollTop = $(this).scrollTop();
            var pageNum = Math.round(scrollTop / that.height) + 1;
            if (pdfDoc) {
                if (pageNum > pdfDoc.numPages) {
                    pageNum = pdfDoc.numPages;
                }
            }
            that.pageNum = pageNum;
        });
    };
    PdfViewComponent.prototype.initFabicObject = function () {
        var that = this;
        var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
        var deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;
        // init icon sign for image on document
        fabric_1.fabric.Object.prototype.transparentCorners = false;
        fabric_1.fabric.Object.prototype.cornerColor = 'red';
        fabric_1.fabric.Object.prototype.cornerStyle = 'circle';
        fabric_1.fabric.Object.prototype.controls.deleteControl = new fabric_1.fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 0,
            offsetX: 0,
            cursorStyle: 'pointer',
            mouseUpHandler: function (eventData, transform) {
                var target = transform.target;
                var canvas = target.canvas;
                canvas.remove(target);
                canvas.requestRenderAll();
                event_emitter_1.eventEmitter.emit('sign:remove', target);
            },
            render: that.renderIcon(deleteImg),
            cornerSize: 24
        });
    };
    PdfViewComponent.prototype.renderIcon = function (icon) {
        return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric_1.fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(icon, -size / 2, -size / 2, size, size);
            ctx.restore();
        };
    };
    PdfViewComponent.prototype.nextPage = function () {
        if (this.pageNum >= this.totalPage) {
            return;
        }
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    };
    PdfViewComponent.prototype.prevPage = function () {
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    };
    PdfViewComponent.prototype.firstPage = function () {
        this.pageNum = 1;
        this.queueRenderPage(1);
    };
    PdfViewComponent.prototype.lastPage = function () {
        this.pageNum = this.totalPage;
        this.queueRenderPage(this.totalPage);
    };
    PdfViewComponent.prototype.zoomOutView = function () {
        var _this = this;
        this.zoomX -= constant_1.SIGNATURE.RATIOZOOM;
        if (this.zoomX >= constant_1.SIGNATURE.MINZOOM) {
            this.canvasFs.forEach(function (item) {
                item.canvasF.setZoom(_this.zoomX);
                item.canvasF.setWidth(item.size.width * _this.zoomX);
                item.canvasF.setHeight(item.size.height * _this.zoomX);
                item.canvasF.requestRenderAll();
            });
        }
        else {
            this.zoomX = constant_1.SIGNATURE.MINZOOM;
        }
    };
    PdfViewComponent.prototype.zoomInView = function () {
        var _this = this;
        this.zoomX += constant_1.SIGNATURE.RATIOZOOM;
        if (this.zoomX <= constant_1.SIGNATURE.MAXZOOM) {
            this.canvasFs.forEach(function (item) {
                item.canvasF.setZoom(_this.zoomX);
                item.canvasF.setWidth(item.size.width * _this.zoomX);
                item.canvasF.setHeight(item.size.height * _this.zoomX);
                item.canvasF.requestRenderAll();
            });
        }
        else {
            this.zoomX = constant_1.SIGNATURE.MAXZOOM;
        }
    };
    PdfViewComponent.prototype.changePageNumber = function () {
        if (this.pageNum > this.totalPage) {
            this.pageNum = this.totalPage;
        }
        this.queueRenderPage(this.pageNum);
    };
    PdfViewComponent.prototype.queueRenderPage = function (num) {
        if (!this.pageRendering) {
            setTimeout(function () {
                document.getElementById(constant_1.SIGNATURE.SUFFIX_VIEW_ID + num).scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    };
    PdfViewComponent.prototype.disableLoading = function () {
        $('.pdf-loading').css('display', 'none');
    };
    PdfViewComponent.prototype.setSignSelection = function (sign) {
        var _this = this;
        var canvasSelected = this.canvasFs.find(function (canvas) { return canvas.canvasF.pageIndex == sign.page.toString(); });
        if (this.objectSelect.page != sign.page.toString() || this.objectSelect.page != this.pageNum) {
            document.getElementById(constant_1.SIGNATURE.SUFFIX_VIEW_ID + sign.page).scrollIntoView({ behavior: 'smooth' });
            var canvasCurrent = this.canvasFs.find(function (canvas) { return canvas.canvasF.pageIndex == _this.objectSelect.page; });
            canvasCurrent.canvasF.discardActiveObject();
            canvasCurrent.canvasF.requestRenderAll();
        }
        if (canvasSelected) {
            var listObjectsCanvas = canvasSelected.canvasF.getObjects();
            var signObjectSelected = listObjectsCanvas.find(function (object) { return object.privateId == sign.privateId; });
            canvasSelected.canvasF.setActiveObject(signObjectSelected);
            canvasSelected.canvasF.requestRenderAll();
        }
    };
    PdfViewComponent.prototype.approve = function () {
        event_emitter_1.eventEmitter.emit("authentication:approve");
    };
    PdfViewComponent.prototype.refuseApprove = function () {
        event_emitter_1.eventEmitter.emit("authentication:refuseApprove");
    };
    PdfViewComponent.prototype.sign = function () {
        event_emitter_1.eventEmitter.emit("authentication:sign");
    };
    PdfViewComponent.prototype.refuseSign = function () {
        event_emitter_1.eventEmitter.emit("authentication:refuseSign");
    };
    __decorate([
        core_1.ViewChild('pdfViewer', { static: true })
    ], PdfViewComponent.prototype, "pdfViewer");
    __decorate([
        core_1.Input()
    ], PdfViewComponent.prototype, "documentSign");
    __decorate([
        core_1.Input()
    ], PdfViewComponent.prototype, "currentUser");
    __decorate([
        core_1.Input()
    ], PdfViewComponent.prototype, "isContractSearch");
    PdfViewComponent = __decorate([
        core_1.Component({
            selector: 'app-pdf-viewer',
            templateUrl: './pdf-viewer.component.html'
        })
    ], PdfViewComponent);
    return PdfViewComponent;
}());
exports.PdfViewComponent = PdfViewComponent;
