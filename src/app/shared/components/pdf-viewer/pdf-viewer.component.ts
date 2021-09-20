import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SIGNATURE } from '@app/shared/constant';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, version } from 'pdfjs-dist';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import signUtils from '@app/shared/utils/sign';
import { fabric } from 'fabric';
import * as $ from 'jquery';
import { Credential } from '@app/core/models';
import 'jqueryui';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html'
})

export class PdfViewComponent implements OnInit, OnDestroy {
  @ViewChild('pdfViewer', { static: true }) pdfViewer;
  @Input() documentSign: any;
  @Input() currentUser: Credential;
  emailAssignment: any;
  private handlers;
  private x = SIGNATURE.X;
  private y = SIGNATURE.Y;
  private zoomX = 0.7;
  private objectSelect = null;
  private canvasFs = [];
  private height = 0;
  private pageNum = 1;
  private pageRendering = false;
  private currentFile: any;
  totalPage: any = 0;
  constructor(
  ) {
    const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }
  ngOnDestroy(): void {
    eventEmitter.destroy(this.handlers);
  }

  ngOnInit() {

    if (this.documentSign.myselfSign) {
      this.emailAssignment = this.documentSign.emailAssignment;
    }
    
    this.handlers = [
      eventEmitter.on('pdf:View', ({ fileSign, employeesSign }) => {
        this.currentFile = fileSign;
        this.loadPdfViewer(fileSign, employeesSign, this.disableLoading);
      }),
      eventEmitter.on("sign:setPageNumerByThumb", (number) => {
        this.pageNum = number;
        this.queueRenderPage(number);
      }),
      eventEmitter.on('sign:changeEmailAssignment', (emailAssignment) => {
        this.emailAssignment = emailAssignment;
      }),
      eventEmitter.on('sign:selection', (sign) => {
        this.setSignSelection(sign);
      })
    ];
  }

  private async createPageViewer(canvas, ctx, page, pageNumber) {
    let viewport = page.getViewport({ scale: SIGNATURE.PDF_SCALE });
    //Render PDF page into canvas context
    canvas.width = viewport.width;
    canvas.height = viewport.height;;

    canvas.style.width = "100%";

    canvas.id = SIGNATURE.SUFFIX_VIEW_ID + pageNumber;
    canvas.className = 'viewer_style';

    this.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    // catch event drop signature
     this.droppableHandleCanvas(canvas, pageNumber);

    let renderTask = page.render(renderContext);
    this.zoomX = 0.7
    this.pdfpromise(renderTask, canvas, viewport);
    var pageViewer = document.createElement('div');
    if ($('#' + canvas.id).length == 0) {
      pageViewer.className = 'page-viewer';
      pageViewer.appendChild(canvas);
    }
    return pageViewer;
  }

  private async loadPdfViewer(fileSign, employeesSign, callback) {
    this.canvasFs = [];
    $('.pdf-loading').css('display', 'block');
    this.pdfViewer.nativeElement.innerHTML = '';
    const data = atob(fileSign.data);
    const pdfDoc = await getDocument({ data }).promise;
    this.totalPage = pdfDoc.numPages;
    // init event scroll
    this.initScroll(pdfDoc);

    for (let i = 1; i < pdfDoc.numPages + 1; i++) {
      var canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      const page = await pdfDoc.getPage(i);
      const pageView = await this.createPageViewer(canvas, ctx, page, i);
      this.pdfViewer.nativeElement.appendChild(pageView);
    }

    this.initFabicObject();
    callback();
  }


  // Phước thức kéo thả chữ ký
  private droppableHandleCanvas(canvas, pageNumber) {
    let that = this;
    
    $(canvas).droppable({
      drop: function (event, ui) {
        if (!that.emailAssignment) {
          eventEmitter.emit("sign:NotEmailAssignment", false);
          return false;
        }
        if (ui.draggable != ui.helper) {         

          let scrollTop = $(SIGNATURE.SELECTOR.ScrollViewer).scrollTop();
          let top = ui.position.top + scrollTop;
          let left = ui.position.left - $(this).offset().left;

          let width = SIGNATURE.WIDTH_ICON * SIGNATURE.PDF_SCALE;
          let height = SIGNATURE.HEIGHT_ICON * SIGNATURE.PDF_SCALE;

          let id = $(this).attr('id');
          let calHeight = 0;

          let data_image = ui.helper[0].attributes['data-image'].value;

          let isinitial = false;
          if (data_image == 'initial_signature') {
            isinitial = true;
            width = 82 * SIGNATURE.PDF_SCALE;
            height = 40 * SIGNATURE.PDF_SCALE;
          }

          const img = that.generateSignImg(ui, width, height);
          let signType = img.attributes['src'].value.includes('sign-icon.svg') ? 1 : 0;
          // sortByKey(canvasFs, 'index');

          //duyệt từng page
          that.canvasFs.forEach((item, index) => {
            if (item.index < pageNumber) {
              calHeight += item.canvasF.height + SIGNATURE.INTMARGIN / SIGNATURE.PDF_SCALE;
            }
          });
            
          let signIndex = SIGNATURE.SIGN_NUM++;
          top =  ((top - calHeight) / that.zoomX) - 50;
          left = left / that.zoomX;
          if (that.canvasFs && that.canvasFs.length > 0) {
            that.canvasFs.forEach((item, index) => {
              if (item.id == id) {
                that.addSign(
                  item.canvasF,
                  img,
                  top,
                  left,
                  width,
                  height,
                  SIGNATURE.SX_DEFAULT,
                  SIGNATURE.SX_DEFAULT,
                  signUtils.createGuid(),
                  true,
                  isinitial,
                  signType,
                  signIndex,
                  that.emailAssignment
                );
              }
            });
          }
        }
      }
    });
  }

  private addSign(canvas, img, top, left, width, height, scaleX, scaleY, privateId, hasmakeRequest, isinitial, signType, signindex, emailAssignment) {
    let that = this;
    scaleX = scaleX || 1;
    scaleY = scaleY || 1;
    ({ top, left } = that.reMathTopLeft(top, left, width, height, scaleX, scaleY, canvas));
   
    const option = {
      left: left,
      top: top,
      width: width,
      height: height,
      targetFindTolerance: 2,
      objectCaching: false
    };

    setTimeout(() => {
      that.addsigntodoc(img, option, scaleX, scaleY, canvas, privateId, hasmakeRequest, isinitial, signType, signindex, emailAssignment);
    }, 100);
  }

  addsigntodoc(img, option, scaleX, scaleY, canvas, privateId, hasmakeRequest, isinitial, signType, signIndex, emailAssignment) {
    const pageIndex = parseInt((canvas.pageIndex || '1'));
    const rect = new fabric.Image(img, option);
    rect.scaleX = scaleX;
    rect.scaleY = scaleY;
    rect.privateId = privateId;
    rect.page = pageIndex;
    rect.privateImg = img;
    rect.isinitial = isinitial;
    rect.signType = signType;
    rect.signIndex = signIndex;
    rect.emailAssignment = emailAssignment
    rect.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      tl: false,
      tr: false,
      mtr: false,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    if (hasmakeRequest) {
      const sign = {
        page: pageIndex,
        coordinateY: option.top,// / SIGNATURE.PDF_SCALE,
        coordinateX: option.left,// / SIGNATURE.PDF_SCALE,
        signType: signType,
        height: option.height, //* scaleY / SIGNATURE.PDF_SCALE,
        width: option.width, // * scaleX / SIGNATURE.PDF_SCALE,
        privateId: privateId,
        signIndex: signIndex,
        emailAssignment: emailAssignment,
        scaleX: scaleX,
        scaleY: scaleY,
        img: img,
        isinitial: isinitial,
        name: this.currentFile.fileName,
        fileSignId: this.currentFile.id,
        scale: scaleX,
      };
      eventEmitter.emit("sign:add", sign);
    }
    canvas.requestRenderAll();
  }

  private reMathTopLeft(top, left, width, height, scaleX, scaleY, canvas) {
    let _containorW = canvas.width / this.zoomX;
    let _containorH = canvas.height / this.zoomX;

    if (left + width * scaleY > _containorW) {
      left = left - ((left + width * scaleY) - _containorW) - SIGNATURE.INTMARGIN;
    }

    if (left <= SIGNATURE.INTMARGIN) {
      left = SIGNATURE.INTMARGIN;
    }

    if (top <= SIGNATURE.INTMARGIN) {
      top = SIGNATURE.INTMARGIN;
    }

    if (top > SIGNATURE.INTMARGIN && top + height * scaleX > _containorH - SIGNATURE.INTMARGIN) {
      top = top - ((top + height * scaleX) - _containorH) - SIGNATURE.INTMARGIN;
    }
   
    return { top, left };
  }

  private generateSignImg(ui, width, height) {
    const img = document.createElement('img');
    if (!this.documentSign.myselfSign) {
      img.src = this.getBackgroundImageUrl($(ui.helper));    
      return img;
    }
    
    img.src = signUtils.convertBase64ToImage(this.currentUser.signatureImage);
    const option = {
      width: width,
      height: height,
    };
    signUtils.resize2img(img, option ,'png', (result) => {
      img.src = result;
    });

    return img;
  }

  private getBackgroundImageUrl($element) {
    if (!($element instanceof jQuery)) {
      $element = $($element);
    }
    var imageUrl = $element.css('background-image');
    return imageUrl.replace(/(url\(|\)|'|")/gi, ''); // Strip everything but the url itself
  }

  private pdfpromise(renderTask, canvas, viewport) {
    let that = this;
    renderTask.promise.then(() => {
      const bg = canvas.toDataURL("image/png");

      const fcanvas = new fabric.Canvas(canvas.id, {
        selection: false,
      });
       
      fcanvas.setBackgroundImage(bg, fcanvas.renderAll.bind(fcanvas));
      fcanvas.setZoom(that.zoomX);
      fcanvas.setWidth(viewport.width * that.zoomX);
      fcanvas.setHeight(viewport.height * that.zoomX);
      fcanvas.renderAndReset();

      fcanvas.pageIndex = canvas.id.split('_')[1];

      const obj = {
        canvasF: fcanvas,
        id: canvas.id,
        index: parseInt(fcanvas.pageIndex),
        size: { width: viewport.width, height: viewport.height }
      };
      const index = canvas.id.split('_')[1];

      //Các sự kiện trên canvas
      that.handleObjectInCanvas(fcanvas, index);
      that.loadSign(fcanvas);
      that.canvasFs.push(obj);
    });
  }

  private loadSign(fcanvas) {
    // this.currentFile.id
    const lsSign = this.documentSign.listSign.filter(sign => sign.fileSignId === this.currentFile.id);
    if (lsSign && lsSign.length > 0) {
      lsSign.forEach((sign) => {
        if (fcanvas.pageIndex == sign.page) {
          this.addSign(
            fcanvas,
            sign.img,
            sign.coordinateY,// * sign.scale * SIGNATURE.PDF_SCALE,
            sign.coordinateX,// * sign.scale * SIGNATURE.PDF_SCALE,
            sign.width,
            sign.height,
            sign.scale,
            sign.scale,
            sign.privateId,
            false,
            sign.isinitial,
            sign.signType,
            sign.signIndex,
            sign.emailAssignment,
          );
        }
      });
    }
  }

  private handleObjectInCanvas(fcanvas, index) {
    let that = this;
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
          var sctop = $(SIGNATURE.SELECTOR.ScrollViewer).scrollTop() + _y;
          var scleft = $(SIGNATURE.SELECTOR.ScrollViewer).scrollLeft() + _x;
          $(SIGNATURE.SELECTOR.ScrollViewer).scrollTop(sctop);
          $(SIGNATURE.SELECTOR.ScrollViewer).scrollLeft(scleft);
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
        that.objectSelect = e.selected[0];          
        that.setSignProperties(that.objectSelect);
      }
    });

    fcanvas.on({
      'selection:updated': function (e) {
        that.objectSelect = e.selected[0];
        console.log('OK');
        that.setSignProperties(that.objectSelect, true);
      }
    });

    fcanvas.on({
      'object:moving': function (e) {
        that.fixedDragOut(this, e, index, true);
        e.target.isUpdate = true;
        that.setSignProperties(e.target);
      }
    });

    fcanvas.on({
      'object:moved': function (e) {
      that.fixedDragOut(this, e, index, false);
      }
    });

    fcanvas.on({
      'object:scaling': function (e) {
        const objSelect = e.transform.target;
        that.fixScaleSize(objSelect);
      }
    });
  }

  setSignProperties(obj, isUpdate:any = false) {
    obj.isUpdate = isUpdate;
    eventEmitter.emit("sign:set-properties", obj);
  }

  fixScaleSize(objSelect) {
    const canvas = objSelect.canvas;
    const _containerW = canvas.width / this.zoomX;
    const _containerH = canvas.height / this.zoomX;
    if (objSelect.left + objSelect.width * objSelect.scaleX > _containerW - SIGNATURE.INTMARGIN) {
      objSelect.scaleY = objSelect.scaleX = (_containerW - SIGNATURE.INTMARGIN - objSelect.left) / objSelect.width;
    }

    if (objSelect.top + objSelect.height * objSelect.scaleX > _containerH - SIGNATURE.INTMARGIN) {
      objSelect.scaleY = objSelect.scaleX = (_containerH - SIGNATURE.INTMARGIN - objSelect.top) / objSelect.height;
    }

    if (objSelect.scaleX < SIGNATURE.MINSCALE) {
      objSelect.scaleY = objSelect.scaleX = SIGNATURE.MINSCALE;
    } else if (objSelect.scaleX > SIGNATURE.MAXSCALE) {
      objSelect.scaleY = objSelect.scaleX = SIGNATURE.MAXSCALE;
    }

    objSelect.isUpdate = true;
    this.setSignProperties(objSelect)
  }

  fixedDragOut(curent, e, index, dragNPPage) {
    const objSelect = e.target;
    const scaleX = objSelect.scaleX || SIGNATURE.SX_DEFAULT;
    const scaleY = objSelect.scaleY || SIGNATURE.SX_DEFAULT;
    const containerHeight = curent.height / this.zoomX;
    const containerWidth = curent.width / this.zoomX;
    const objPositionBottom = objSelect.top + objSelect.height * objSelect.scaleY;
    const objPositionRight = objSelect.left + objSelect.width * objSelect.scaleX;
    const contentBottom = containerHeight - SIGNATURE.INTMARGIN - objSelect.height * objSelect.scaleX;
    const contentRigth = containerWidth - SIGNATURE.INTMARGIN - objSelect.width * objSelect.scaleX;

    let notePrev;
    let noteNext;
    const prevId = SIGNATURE.SUFFIX_VIEW_ID + (parseInt(objSelect.page) - 1);
    const nextId = SIGNATURE.SUFFIX_VIEW_ID + (parseInt(objSelect.page) + 1);

    this.canvasFs.forEach((item, index) => {      
      if (item.id == prevId) {
        notePrev = item.canvasF;
      }
      if (item.id == nextId) {
        noteNext = item.canvasF;
      }
    });

    // drap top
    if (objSelect.top < - objSelect.height / 2 ||
      ((!notePrev || !dragNPPage) && objSelect.top < SIGNATURE.INTMARGIN)
    ) {
      if (notePrev && dragNPPage) {
        const contentBottomPrev = notePrev.height / this.zoomX - SIGNATURE.INTMARGIN - objSelect.height * objSelect.scaleX;
        const leftPrev = objSelect.left * ((notePrev.width / this.zoomX) / containerWidth);
        this.addSign(
          notePrev,
          objSelect._element,
          contentBottomPrev,
          leftPrev,
          objSelect.width,
          objSelect.height,
          scaleX,
          scaleY,
          objSelect.privateId,
          true,
          objSelect.isinitial,
          objSelect.signType,
          objSelect.signIndex,
          objSelect.emailAssignment
        );

        curent.remove(objSelect);
      } else {
        objSelect.top = SIGNATURE.INTMARGIN;
      }
    }

    // drap left
    if (objPositionRight + SIGNATURE.INTMARGIN >= containerWidth) {
      objSelect.left = contentRigth;
    }

    // drap right
    if (objSelect.left < SIGNATURE.INTMARGIN) {
      objSelect.left = SIGNATURE.INTMARGIN;
    }
    // drap bottom
    if ((objPositionBottom - (objSelect.height / 2)) >= containerHeight ||
      ((!noteNext || !dragNPPage) && objPositionBottom + SIGNATURE.INTMARGIN >= containerHeight)
    ) {
      if (noteNext && dragNPPage) {
        const leftNext = objSelect.left * ((noteNext.width / this.zoomX) / containerWidth);
        this.addSign(
          noteNext,
          objSelect._element,
          SIGNATURE.INTMARGIN,
          leftNext,
          objSelect.width,
          objSelect.height,
          scaleX,
          scaleY,
          objSelect.privateId,
          true,
          objSelect.isinitial,
          objSelect.signType,
          objSelect.signIndex,
          objSelect.emailAssignment
        );
        curent.remove(objSelect);

      } else {
        objSelect.top = contentBottom;
      }
    }
    curent.requestRenderAll();
  }

  private clearSignProperties() {
    eventEmitter.emit("sign:clear-properties");
  }

  private initScroll(pdfDoc) {
    let that = this;
    $(SIGNATURE.SELECTOR.ScrollViewer).on("scroll", function () {
      var scrollTop = $(this).scrollTop();
      let pageNum = Math.round(scrollTop / that.height) + 1;

      if (pdfDoc) {
        if (pageNum > pdfDoc.numPages) {
          pageNum = pdfDoc.numPages;
        }
      }
      that.pageNum = pageNum;
    });
  }

  private initFabicObject() {
    let that = this;
    const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;
    // init icon sign for image on document
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'red';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 0,
      offsetX: 0,
      cursorStyle: 'pointer',
      mouseUpHandler: function (eventData, transform) {
        const target = transform.target;
        const canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
        eventEmitter.emit('sign:remove', target);
      },
      render: that.renderIcon(deleteImg),
      cornerSize: 24
    });
  }

  private renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  nextPage() {
    if (this.pageNum >= this.totalPage) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }

  prevPage() {
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }


  firstPage() {
    this.pageNum = 1;
    this.queueRenderPage(1);
  }

  lastPage() {
    this.pageNum = this.totalPage;
    this.queueRenderPage(this.totalPage);
  }

  zoomOutView() {
    this.zoomX -= SIGNATURE.RATIOZOOM;
    if (this.zoomX >= SIGNATURE.MINZOOM) {
      this.canvasFs.forEach((item) => {
        item.canvasF.setZoom(this.zoomX);
        item.canvasF.setWidth(item.size.width * this.zoomX);
        item.canvasF.setHeight(item.size.height * this.zoomX);
        item.canvasF.requestRenderAll();
      });
    }
    else {
      this.zoomX = SIGNATURE.MINZOOM;
    }
  }

  zoomInView() {
    this.zoomX += SIGNATURE.RATIOZOOM;
    if (this.zoomX <= SIGNATURE.MAXZOOM) {
      this.canvasFs.forEach((item) => {
        item.canvasF.setZoom(this.zoomX);
        item.canvasF.setWidth(item.size.width * this.zoomX);
        item.canvasF.setHeight(item.size.height * this.zoomX);
        item.canvasF.requestRenderAll();
      });
    }
    else {
      this.zoomX = SIGNATURE.MAXZOOM;
    }
  }

  changePageNumber() {

    if (this.pageNum > this.totalPage) {
      this.pageNum = this.totalPage;
    }

    this.queueRenderPage(this.pageNum);
  }

  queueRenderPage(num) {
    if (!this.pageRendering) {
      setTimeout(() => {
        document.getElementById(SIGNATURE.SUFFIX_VIEW_ID + num).scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }

  private disableLoading() {
    $('.pdf-loading').css('display', 'none');
  }

  private setSignSelection(sign) {
    const canvasSelected = this.canvasFs.find(canvas => canvas.canvasF.pageIndex == sign.page.toString());
    if (this.objectSelect.page != sign.page.toString() || this.objectSelect.page != this.pageNum) {
      document.getElementById(SIGNATURE.SUFFIX_VIEW_ID + sign.page).scrollIntoView({ behavior: 'smooth' });
      const canvasCurrent = this.canvasFs.find(canvas => canvas.canvasF.pageIndex == this.objectSelect["page"]);
      canvasCurrent.canvasF.discardActiveObject();
      canvasCurrent.canvasF.requestRenderAll();
    }
    if (canvasSelected) {
      const listObjectsCanvas = canvasSelected.canvasF.getObjects();
      const signObjectSelected = listObjectsCanvas.find(object => object.privateId == sign.privateId);
      canvasSelected.canvasF.setActiveObject(signObjectSelected);
      canvasSelected.canvasF.requestRenderAll();
    }
  }
}
