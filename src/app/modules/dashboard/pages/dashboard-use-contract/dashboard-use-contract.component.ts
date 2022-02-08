import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ReportSummaryService,
} from "@app/core/services";
@Component({
  selector: "app-dashboard-use-contract",
  templateUrl: "./dashboard-use-contract.component.html",
  styleUrls: ["./dashboard-use-contract.component.less"],
})
export class DashboardUseContractComponent implements OnInit, OnDestroy {
  optionsContractUserNew: any;
  optionsContractUserHandle: any;
  optionsContractCompany: any;
  constructor(
    private reportSummaryService: ReportSummaryService,
  ) {}  
 

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

  ngOnInit() {
    this.loadUserCreate();
    this.getContractProcess();
    this.getContractVendor();
  }

  private loadUserCreate() {
    this.reportSummaryService.getConuserCreated().subscribe((res) => {
      this.optionsContractUserNew = {
        results: [
          {
            name: "Nháp",
            value: res.draft,
          },
          {
            name: "Đang xử lý",
            value: res.processing,
          },
          {
            name: "Đã từ chối",
            value: res.refuse,
          },
          {
            name: "Hoàn thành",
            value: res.finish,
          },
          {
            name: "Đã hủy",
            value: res.cancel,
          },
        ],
        barPadding: 40,
      };
    });
  }

  private getContractProcess() {
    this.reportSummaryService.getContractProcess().subscribe((res) => {
      this.optionsContractUserHandle = {
        results: [
          {
            name: "Hợp đồng chờ phê duyệt",
            value: res.approve,
          },
          {
            name: "Hợp đồng từ chối",
            value: res.approve,
          },
          {
            name: "Hóa đơn chờ ký duyệt",
            value: res.sign,
          },
        ],
        barPadding: 80,
      };
    
    });
  }

  private getContractVendor() {
    this.reportSummaryService.getContractVendor().subscribe((res) => {
      this.optionsContractCompany = {
        results: [
          {
            name: `Hợp đồng đang xử lý ${res.draft}`,
            value: res.draft,
          },
          {
            name: `Hợp đồng đã từ chối  ${res.refuse}`,
            value: res.refuse,
          },
          {
            name: `Hợp đồng đã hoàn thành ${res.finish}`,
            value: res.finish,
          },
          {
            name: `Hợp đồng đã hủy  ${res.cancel}`,
            value: res.cancel,
          },
        ],
      };
    });
  }

  ngOnDestroy() {}
}
