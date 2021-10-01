import { Component, OnInit, OnDestroy } from "@angular/core";
@Component({
  selector: "app-dashboard-use-contract",
  templateUrl: "./dashboard-use-contract.component.html",
  styleUrls: ["./dashboard-use-contract.component.less"],
})
export class DashboardUseContractComponent implements OnInit, OnDestroy {
  optionsContractUserNew = {
    results: [
      {
        name: "Nháp",
        value: 5,
      },
      {
        name: "Đang xử lý",
        value: 13,
      },
      {
        name: "Đã từ chối",
        value: 1,
      },
      {
        name: "Hoàn thành",
        value: 9,
      },
      {
        name: "Đã hủy",
        value: 14,
      },
    ],
    barPadding: 40,
  };

  optionsContractUserHandle = {
    results: [
      {
        name: "Hóa đơn chờ ký nháy",
        value: 0,
      },
      {
        name: "Hóa đơn chờ phê duyệt",
        value: 1,
      },
      {
        name: "Hóa đơn chờ ký duyệt",
        value: 6,
      },
    ],
    barPadding: 50,
  };

  optionsContractCompany = {
    results: [
      {
        name: "Hợp đồng đang xử lý (19)",
        value: 19,
      },
      {
        name: "Hợp đồng đã từ chối (1)",
        value: 1,
      },
      {
        name: "Hợp đồng đã hoàn thành (9)",
        value: 9,
      },
      {
        name: "Hợp đồng đã hủy (17)",
        value: 17,
      },
    ],
  };

  datas = [
    {
      label: "Chờ thiết lập luồng ký",
      value: 0,
    },
    {
      label: "Đang xử lý",
      value: 0,
    },
    {
      label: "Đã ký",
      value: 0,
    },
    {
      label: "Đã từ chối",
      value: 0,
    },
  ];

  ngOnInit() {}

  ngOnDestroy() {}
}
