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
  selector: 'app-pdf-viewer-only',
  templateUrl: './pdf-viewer-only.component.html'
})

export class PdfViewOnlyComponent implements OnInit, OnDestroy {
  @ViewChild('pdfViewer', { static: true }) pdfViewer;
  @Input() documentSign: any;
  @Input() currentUser: Credential;
  @Input() isApprove: boolean;
  employeeSign: any;
  private handlers;
  private x = SIGNATURE.X;
  private y = SIGNATURE.Y;
  private zoomX = 0.7;
  private objectSelect = {
    isUpdate: false,
    page:1,
  };
  private canvasFs = [];
  private height = 0;
  private pageNum = 1;
  private pageRendering = false;
  private currentFile: any;
  private hasSignPad: any;
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
    this.checkHasSignPad();
    this.handlers = [
      eventEmitter.on('pdf:View', ({ fileSign, employeesSign }) => {
        this.currentFile = fileSign;
        this.loadPdfViewer(fileSign, employeesSign, this.disableLoading);
      }),
      eventEmitter.on("sign:setPageNumerByThumb", (number) => {
        this.pageNum = number;
        this.queueRenderPage(number);
      }),
      eventEmitter.on('sign:changeSignPad', (data) => {
        this.changeSignOfUser(data);
      }),
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

    let renderTask = page.render(renderContext);
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
    // this.initFabicObject();
    callback();
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
      objectCaching: false,
      selectable: false,
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
    rect.width = option.width;
    rect.height = option.height;
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
      const canvasCurrent = this.canvasFs.find(canvas => canvas.canvasF.pageIndex == this.objectSelect.page);
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

  approve() {
    eventEmitter.emit("authentication:approve");
  }

  refuseApprove() {
    eventEmitter.emit("authentication:refuseApprove");
  }

  sign() {
    eventEmitter.emit("authentication:sign");
  }

  refuseSign() {
    eventEmitter.emit("authentication:refuseSign");
  }

  openSignPad() {
    eventEmitter.emit("authentication:openSignPad");
  }

  private checkHasSignPad() {
    if (this.currentUser != null  &&  this.currentUser.signatureImage) {
      this.hasSignPad = true;
    } else {
      this.hasSignPad = false;
    }
  }

  changeSignOfUser(data) {
    this.canvasFs.forEach(cv => {
      var activeObject = cv.canvasF.getObjects();
      if (activeObject.length) {
        activeObject.forEach((e) => {   
          const img = signUtils.convertBase64ToImage(data);
          e.set({left: e.left, top: e.top, scaleX: e.scaleX, scaleY: e.scaleY})
          e.setSrc(img, () => {
            cv.canvasF.renderAll();
          })
        });
      }
    }); 
 }

}
