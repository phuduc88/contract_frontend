import { Component, OnInit, ViewEncapsulation, Input, ViewChild, OnDestroy } from '@angular/core';
import { SIGNATURE } from '@app/shared/constant';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, version } from 'pdfjs-dist';
@Component({
  selector: 'app-pdf-list-thumbnail',
  templateUrl: './pdf-list-thumbnail.component.html'
})

export class PdfListThumbnailComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailPdfList', { static: true }) thumbnailPdfList;
  @Input() filesSign: any;
  constructor(
  ) {
  }
  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.createListFile(this.showMainPage);
  }

  private showMainPage(fileSign, employeesSign) {
    eventEmitter.emit('pdf:View', {
      fileSign,
      employeesSign
    });
  }

  private createListFile(callback) {

    this.filesSign.forEach((item, index) => {
      const containerthumb = document.createElement('div');
      containerthumb.setAttribute('meta-data-file-path', item.fileName);
      containerthumb.setAttribute('toggle', item.id)
      containerthumb.className = 'd-flex container-thumb';

      const icon = document.createElement('div');
      icon.className = 'icon-thumbs';
      icon.style.backgroundImage = 'url(' + item.icon + ')';
      icon.style.backgroundRepeat = "no-repeat";

      const spanfilename = document.createElement('span');
      spanfilename.innerText = item.fileName;
      spanfilename.className = 'title-file-thumb';

      const containorpage = document.createElement('div');
      containorpage.setAttribute('meta-data-ls-thumb-id', item.id);

      containorpage.id = item.id;

      containorpage.className = 'containor-page';
      // containerthumb.nativeElement.on('blur', (event) => {});

      this.handleEventThumbnail(containerthumb, item, callback);

      if (index > 0) {
        $(containorpage).hide();
      }
      else {
        $(containerthumb).addClass('active');
      }
      let documentData = atob(this.filesSign[index].data);
      this.createThumbOfPdfFile({ data: documentData }, containorpage.id);

      containerthumb.appendChild(icon);
      containerthumb.appendChild(spanfilename);

      this.thumbnailPdfList.nativeElement.appendChild(containerthumb);
      this.thumbnailPdfList.nativeElement.appendChild(containorpage);
    });

    callback(this.filesSign[0], []);
  }

  private async createThumbOfPdfFile(data, divId) {
    const pdfDoc = await this.loadPdf(data);
    for (let i = 1; i < pdfDoc.numPages + 1; i++) {
      const page = await pdfDoc.getPage(i);
      const thumb = await this.createContainThumb(page, i, divId);
      $(`#${divId}`).append(thumb);
    }

  }
  private async loadPdf(data) {
    const pdfLoading = getDocument(data);
    const pdfDoc = await pdfLoading.promise;
    return pdfDoc;
  }

  private async createContainThumb(page, number, divId) {
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext("2d", { alpha: false });
    const viewport = page.getViewport({ scale: 0.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.id = `thumb_${number}_${divId}`;
    canvas.style.position = 'relative';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const anchor = document.createElement("a");
    anchor.className = "thumb-link";
    const pageRatio = viewport.width / viewport.height;
    const thumbWidth = SIGNATURE.THUMBNAIL_WIDTH;
    const thumbHeight = thumbWidth / pageRatio | 0;

    const divContainCavas = document.createElement('div');
    divContainCavas.className = "thumbnail";
    divContainCavas.setAttribute("data-page-number", number);
    divContainCavas.style.width = thumbWidth + "px";
    divContainCavas.style.height = thumbHeight + "px";
    divContainCavas.style.marginTop = divContainCavas.style.marginLeft = divContainCavas.style.marginRight = "auto";
    divContainCavas.style.marginBottom = "20px";
    divContainCavas.onclick = function () {
      //Xử lý khi click vào page
      eventEmitter.emit("sign:setPageNumerByThumb", number);
    }

    const spanContain = document.createElement('span');
    spanContain.className = 'page-number';
    spanContain.innerText = 'trang' + number;

    const renderTak = await page.render({
      canvasContext: canvasContext,
      viewport
    });

    divContainCavas.appendChild(canvas);
    divContainCavas.appendChild(spanContain)
    anchor.appendChild(divContainCavas);
    return anchor;
  }

  handleEventThumbnail(containerthumb, item, callback) {
    $(containerthumb).on("click", function () {
      if ($('.container-thumb').length > 1) {
        $('.containor-page').hide(100);
        if (!$(this).hasClass('active')) {
          callback(item, []);
          $('#' + $(this).attr('toggle')).show(100);
        } else if ($('#' + $(this).attr('toggle')).css('display') == 'none') {
          $('#' + $(this).attr('toggle')).show(100);
        }
        else {
          $('#' + $(this).attr('toggle')).hide(100);
        }
        $('.container-thumb').removeClass('active');
        $(this).addClass('active');
      }
    });
  }
}
