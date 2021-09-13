export const QUANLYTAILIEU = "QUANLYTAILIEU";
export const QUANTRITHANHVIEN = "QUANTRITHANHVIEN";
export const KY = "KY";
export const MAUTAILIEU = "MAUTAILIEU";
const QUANLYTAILIEU_CHILDREN = {
  XEMNHANHTAILIEU: "XEMNHANHTAILIEU",
  GUILAIEMAIL: "GUILAIEMAIL",
  TAIXUONG: "TAIXUONG",
  HUY: "HUY",
  XOA: "XOA",
  XEMCHITIET: "XEMCHITIET",
  TAOLUONGKY: "TAOLUONGKY",
};

const QUANTRITHANHVIEN_CHILDREN = {
  PHANQUYENNGUOIDUNG: "PHANQUYENNGUOIDUNG",
  ADMINISTRATOR: "ADMINISTRATOR",
};

const KY_CHILDREN = {
  SUDUNGHSM: "SUDUNGHSM",
};
const MAUTAILIEU_CHILDREN = {
  TAILENMAU: "TAILENMAU",
  TAOHOPDONGTUMAU: "TAOHOPDONGTUMAU",
};

export const PERMISSION_LIST_DATA = [
  {
    stt: 1,
    id: QUANLYTAILIEU,
    title: "Quản lý tài liệu",
    check: true,
    childrens: [
      {
        stt: 1,
        title: "Xem nhanh tài liệu",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.XEMNHANHTAILIEU,
      },
      {
        stt: 2,
        title: "Gửi lại email",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.GUILAIEMAIL,
      },
      {
        stt: 3,
        title: "Tải xuống",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.TAIXUONG,
      },
      {
        stt: 4,
        title: "Hủy",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.HUY,
      },
      {
        stt: 5,
        title: "Xóa",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.XOA,
      },
      {
        stt: 6,
        title: "Xem chi tiết",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.XEMCHITIET,
      },
      {
        stt: 7,
        title: "Tạo luồng ký",
        check: true,
        id: QUANLYTAILIEU_CHILDREN.TAOLUONGKY,
      },
    ],
  },
  {
    stt: 2,
    id: QUANTRITHANHVIEN,
    check: true,
    title: "Quản trị thành viên",
    childrens: [
      {
        stt: 1,
        title: "Phân quyền người dùng",
        check: false,
        id: QUANTRITHANHVIEN_CHILDREN.PHANQUYENNGUOIDUNG,
      },
      {
        stt: 2,
        title: "Administrator",
        check: false,
        id: QUANTRITHANHVIEN_CHILDREN.ADMINISTRATOR,
      },
    ],
  },
  {
    stt: 3,
    id: KY,
    title: "Ký",
    check: false,
    childrens: [
      {
        stt: 1,
        title: "Sử dụng HSM",
        check: false,
        id: KY_CHILDREN.SUDUNGHSM,
      },
    ],
  },
  {
    stt: 4,
    id: MAUTAILIEU,
    title: "Mẫu tài liệu",
    check: false,
    childrens: [
      {
        stt: 1,
        title: "Tải lên mẫu (file word)",
        check: false,
        id: MAUTAILIEU_CHILDREN.TAILENMAU,
      },
      {
        stt: 2,
        title: "Tạo hợp đồng từ mẫu",
        check: false,
        id: MAUTAILIEU_CHILDREN.TAOHOPDONGTUMAU,
      },
    ],
  },
];
