import { GetExtensionImageBase64 } from '@app/shared/constant';

export default {
  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  svg2img(svg, option, format, callback) {
    let xml = new XMLSerializer().serializeToString(svg);
    let svg64 = window.btoa(unescape(encodeURIComponent(xml))); //for utf8: btoa(unescape(encodeURIComponent(xml)))
    let b64start = 'data:image/svg+xml;base64,';
    let image64 = b64start + svg64;

    let canvasTmp = document.createElement('canvas');
    let ctx = canvasTmp.getContext('2d');
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 164, 80);
      let resultImg = canvasTmp.toDataURL('image/' + format);
      callback(resultImg);
    };
    img.src = image64;
  },

  resize2img(imageOriganal, option, format, callback) {
    let canvasTmp = document.createElement('canvas');
    let ctx = canvasTmp.getContext('2d');
    let img = new Image();
    img.src = imageOriganal.src;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, option.width, option.height);
      var resultImg = canvasTmp.toDataURL('image/' + format);
      callback(resultImg);
    }
  },

  controlreize(rect) {
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
  },

  convertBase64ToImage(base64String) {
    if (!base64String) {
      return;
    }

    const chatFirst = base64String.charAt(0);
    const extension = GetExtensionImageBase64(chatFirst);
    return extension + base64String;
  }

};
