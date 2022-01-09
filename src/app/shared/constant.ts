import { FormGroup } from "@angular/forms";
import * as moment from "moment";
import { map } from "rxjs/operators";

export const DATE_FORMAT = {
  ONLY_MONTH_YEAR: "MM/YYYY",
  ONLY_YEAR: "YYYY",
  FULL: "DD/MM/YYYY",
};

export const ROLE = {
  SYSTEMADMIN: "SYSTEMADMIN",
  SALE: "SALE",
  SALE_EMPLOYER: "SALE_EMPLOYER",
  CUSTOMER: "CUSTOMER",
  USER_CUSTOMER: "USER_CUSTOMER",
  CLIENT: "CLIENT",
};

export const PAGE_SIZE = 10;
export const schemaSign = "mbhxh:token,declarationId";

export const GENDER = {
  0: "common.gender.male",
  1: "common.gender.female",
};

export const DOCUMENTSTATUS = {
  1: "common.document.new", 
  2: "common.document.sended",
  3: "common.document.approved",
  4: "common.document.finish",
  5: "common.document.cancel",
};
export const STATUS = {
  0: "common.notActive",
  1: "common.active",
};

export const DECLARATIONRESULT = {
  0: "common.result.draft",
  1: "common.result.success",
  2: "common.result.hasRessult",
};

export const STATUSENDEMAIL = {
  0: "common.emailSented",
  1: "common.emailError",
};

export const EMAILTYPE = {
  1: "common.emailType.customerAccount",
  2: "common.emailType.sellerAccount",
};

export const RESULTSUBMIT = {
  0: "common.resultSubmit.draft",
  1: "common.resultSubmit.notSend",
  2: "common.resultSubmit.sendError",
  3: "common.resultSubmit.sendSuceesfull",
};

export const ACTION = {
  ADD: "Add",
  EDIT: "Edit",
  MUNTILEADD: "MultipleAdd",
  MUNTILEUPDATE: "MultipleUpdate",
  DELETE: "Delete",
};

export const MIME_TYPE = [
  {
    key: ".xlsx",
    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    key: ".docx",
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    key: ".zip",
    value: "application/zip",
  },
  {
    key: ".xml",
    value: "application/xml",
  },
  {
    key: ".pdf",
    value: "application/pdf",
  },
];
export const CRON_TIMES = 0.15 * 60 * 1000; // ~ 1.5 minutes
export const REGEX = {
  ONLY_CHARACTER_NUMBER: "^[a-zA-Z0-9]+$",
  ONLY_NUMBER: "^[0-9]*$",
  ONLY_NUMBER_INCLUDE_DECIMAL: "^[0-9]+(.[0-9]{1,2})?$",
  VALIDATE_NUMBER: /^-?\d+\.?\d*$/,
  VALIDATE_PASSPORT: /^([A-Z a-z]){1}([0-9]){7}$/,
  PHONE_NUMBER: "^([+]?[s0-9]+)?(d{3}|[(]?[0-9]+[)])?([-]?[s]?[0-9])+$",
  EMAIL: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};
export const EXTENSIONFILEPAD = {
  PNG: "png",
  WP_CMKTC: "jpg",
};

export const DOC_TAB_INDEX = {
  DRAFT:0,
  PROCESS: 1,
  FINISH: 2,
  CANCEL: 3,
  OUTOFDATE: 4,  
  REFUSE: 5,
}

export const PERMISSIONS = {
    dashboard :  "dashboard",
    accountManagement :  "accountManagement",
    accountManagementCreate :  "accountManagementCreate",
    accountManagementDelete :  "accountManagementDelete",
    accountManagementInformation :  "accountManagementInformation",
    accountManagementPermision :  "accountManagementPermision",
    accountManagementGeneralSettings :  "accountManagementGeneralSettings",
    contractManagement :  "contractManagement",
    contractManagementApprove :  "contractManagementApprove",
    contractManagementCancel :  "contractManagementCancel",
    contractManagementCreate :  "contractManagementCreate",
    contractManagementDelete :  "contractManagementDelete",
    contractManagementDownload :  "contractManagementDownload",
    contractManagementQuickView :  "contractManagementQuickView",
    contractManagementRefuse :  "contractManagementRefuse",
    contractManagementSendEmail :  "contractManagementSendEmail",
    contractManagementSign :  "contractManagementSign",
    contractManagementViewDetail :  "contractManagementViewDetail",
    documentTemplateManagement :  "documentTemplateManagement",
    documentTemplateManagementUploadExcel :  "documentTemplateManagementUploadExcel",
    documentTemplateManagementUploadWord :  "documentTemplateManagementUploadWord",
    reportManagement :  "reportManagement",
    reportManagementCompare :  "reportManagementCompare",
    reportManagementUseContract :  "reportManagementUseContract",
    reportManagementUseSMS :  "reportManagementUseSMS",
    researchContractManagement :  "researchContractManagement",
    researchContractManagementAuthen :  "researchContractManagementAuthen",
    researchContractManagementSearch :  "researchContractManagementSearch",
    signManagement :  "signManagement",
    signManagementUseHSM :  "signManagementUseHSM",
    systemManagement :  "systemManagement",
    systemManagementConfigEmail :  "systemManagementConfigEmail",
    systemManagementConnnection :  "systemManagementConnnection",
    systemManagementHSM :  "systemManagementHSM",
    systemManagementSMS :  "systemManagementSMS",
};
export const ErrorMessage = {
  0: "common.gender.male",
  8: "common.errorMessenger.dataInvalid",
  2040: "common.errorMessenger.employeeIsExistDeclatation",
};

export const errorMessages = {
  0: "Nam",
  8: "Dữ liệu không hợp lệ",
  11: "Chưa đính kèm file, vui lòng kiểm tra lại file đính kèm",
  2005: "Mật khẩu cũ không khớp, vui lòng kiểm tra lại",
  2040: "NLĐ đã có hồ sơ, bạn không thể xóa",
  2001: "Sai Tên đăng nhập hoặc Mật khẩu. Vui lòng thử lại!",
  3018: "Email đã tồn tại trong hệ thống",
  2030: "Email đã tồn tại trong hệ thống",
  2028: "Tên đăng nhập không được để trống",
  2027: "Tên đăng nhập đã tồn tại",
  2020: "Tài khoản vượt quá số lượng cho phép",
  2035: "Không thể xóa tài khoản mặc định của đơn vị",
  3020: "Mã số BHXH (mã đơn vị) đã được đăng ký sử dụng, vui lòng kiểm tra lại",
  3021: "Đơn vị chưa đăng ký sử dụng dịch vụ IVAN Của MBHXH, Vui lòng tạo hồ sơ đăng ký IVAN trước khi tạo hồ sơ thay đổi",
  5053: "Không được để trống",
  5061: "Lỗi trong quá trình lưu dữ liệu",
};

export const TIME_PICKERS = {
  Options: [
    {
      id: 1,
      value:
        moment().subtract(0, "weeks").startOf("week").format("YYYY-MM-DD") +
        ";" +
        moment().subtract(0, "weeks").endOf("week").format("YYYY-MM-DD"),
      text: "Tuần này",
    },
    {
      id: 2,
      value:
        moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD") +
        ";" +
        moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
      text: "Tuần trước",
    },
    {
      id: 3,
      value:
        moment().subtract(0, "months").startOf("month").format("YYYY-MM-DD") +
        ";" +
        moment().subtract(0, "months").endOf("month").format("YYYY-MM-DD"),
      text: "Tháng này",
    },
    {
      id: 4,
      value:
        moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD") +
        ";" +
        moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"),
      text: "Tháng trước",
    },
    { id: 5, value: "5", text: "Toàn thời gian" },
    { id: 6, value: "6", text: "Phạm vi khác" },
  ],
};

export function formatDateVn(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  month = month.toString().length == 1 ? `0${month}` : month;
  return day + "/" + month + "/" + year;
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function GetExtensionImageBase64(char: string) {
  let result = "";
  switch (char) {
    case "i":
      result = "data:image/png;base64,";
      break;
    case "/":
      result = "data:image/jpg;base64,";
      break;
    case "R":
      result = "data:image/gif;base64,";
      break;
    case "U":
      result = "data:image/webp;base64,";
      break;
  }
  return result;
}

export const SIGNATURE = {
  FILE_ICONS: [
    {
      type: "default",
      icon: "/assets/img/file.svg",
    },
    {
      type: "wordprocessingml.document",
      icon: "/assets/img/doc.svg",
    },
    {
      type: "image/jpeg",
      icon: "/assets/img/jpg.svg",
    },
    {
      type: "image/png",
      icon: "/assets/img/png.svg",
    },
    {
      type: "application/pdf",
      icon: "/assets/img/pdf.svg",
    },
    {
      type: "text/plain",
      icon: "/assets/img/txt.svg",
    },
    {
      type: "presentationml.presentation",
      icon: "/assets/img/ppt.svg",
    },
    {
      type: "application/vnd.ms-excel",
      icon: "/assets/img/csv.svg",
    },
    {
      type: "spreadsheetml.sheet",
      icon: "/assets/img/xls.svg",
    },
    {
      type: "application/msword",
      icon: "/assets/img/doc.svg",
    },
    {
      type: "text/xml",
      icon: "/assets/img/xml.svg",
    },
  ],

  SELECTOR: {
    Containment: "#mainViewer",
    ListSignContainment: "#listSignViewer",
    ObjDragToViewer: ".field-icon-left .btn",
    ContentViewer: "#pdf-viewer",
    ScrollViewer: ".pdfscroll",
    SignObjToViewer: ".noselect .sign-item",
  },
  SUFFIX_VIEW_ID: "viewer_",
  PDF_SCALE: 2,
  SX_DEFAULT: 1,
  INTMARGIN: 20,
  NUMBER_PAGE: 1,
  WIDTH_ICON: 164,
  HEIGHT_ICON: 80,
  SIGN_NUM: 1,
  X: -1,
  Y: -1,
  MAXSCALE: 1.5,
  MINSCALE: 0.2,
  MINZOOM: 0.2,
  MAXZOOM: 1.3,
  RATIOZOOM: 0.1,
  THUMBNAIL_WIDTH: 150,
  THUMBNAIL_CANVAS_BORDER_WIDTH: 1,
};

export const GROUP_TYPE = {
  HSMUSB: 1,
  ONSIGN: 2,
  ISCC: 3,
};

export const CLIENT_TYPE = [
  {
    key: GROUP_TYPE.HSMUSB,
    name: "common.client.organization"
  },
  {
    key: GROUP_TYPE.ONSIGN,
    name: "common.client.personal"
  }
]

export const SIGN_TYPE = [
  {
    key: 1,
    name: "common.sing.certification"
  },
  {
    key: 2,
    name: "common.sing.sms"
  },
  {
    key: 3,
    name: "common.sing.email"
  },
];
export const SIGN_TYPE_VIEW =  {
  1: "common.sing.certification",
  2: "common.sing.sms",
  3: "common.sing.email",
}

export const ROLE_ACTION =  {
  false: "common.roleAction.sign",
  true: "common.roleAction.approve",
}

export const DOCUMENT_STATUS = [
  {
    key: 1,
    name: "common.documentStatus.waitapprove"
  },
  {
    key: 2,
    name: "common.documentStatus.waitothersign"
  },
  {
    key: 3,
    name: "common.documentStatus.waitsign"
  },
  {
    key: 4,
    name: "common.documentStatus.finish"
  },
  {
    key: 5,
    name: "common.documentStatus.refuse"
  }
]

export const CLIENT_TYPE_MASTER =  {
  1: 'common.client.organization',
  2: 'common.client.personal',
}


export const STEP = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
};

export function GetIcon(fileType) {
  const fileIcon = SIGNATURE.FILE_ICONS.find(
    (c) => fileType.indexOf(c.type) > -1
  );
  if (fileIcon) {
    return fileIcon.icon;
  } else {
    SIGNATURE.FILE_ICONS[0].icon;
  }
}

export function CheckDuplicateEmail(array: any) {
  const valueArr = array.map(function (item) {
    return item.email;
  });
  const isDuplicate = valueArr.some(function (item, idx) {
    return valueArr.indexOf(item) != idx;
  });

  return isDuplicate;
}

export function ValidatePhone(phoneNumber: any) {
  phoneNumber = phoneNumber.replace("-", "").replace(".", "").replace(" ", "");
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phoneNumber
  );
}

export function ValidateEmail(email: any) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase()
  );
}
