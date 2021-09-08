import { Component, Input, Output, EventEmitter, OnInit, OnChanges  } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetExtensionImageBase64 } from '@app/shared/constant';

@Component({
  selector: 'app-image-base',
  templateUrl: './image-base.component.html',
  styleUrls: ['./image-base.component.less']
})
export class ImageBaseComponent implements OnInit, OnChanges {
  @Input() base64: any;
  @Input() imageOption: any;

  sourceImage: any = '';
  ngOnInit() {
    
  }
   
  convertBase64ToImage() {

    if(!this.base64) {
      this.sourceImage = '';
      return;
    }

    const chatFirst = this.base64.charAt(0);
    const extension = GetExtensionImageBase64(chatFirst);
    this.sourceImage = extension + this.base64;   
  }

  ngOnChanges(changes) {
    if (changes.base64 && changes.base64.currentValue && changes.base64.currentValue.length) {
      this.convertBase64ToImage();
    }
  }
}
