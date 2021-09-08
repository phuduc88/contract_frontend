import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-document-detail-sign-documents",
  templateUrl: "./sign-documents.component.html",
  styleUrls: ["./sign-documents.component.less"],
})
export class DocumentDetailSignDocumentsComponent implements OnInit {
  datas = [
    {
      stt: 1,
      documnent_name: "1 - 2 Seller TỔ CHỨC ủy quyền cho NJV.docx",
      documentSigns: [
        {
          stt: 1,
          signInfo: {
            fullName: "chị thủy",
            email: "vongocthuy83@gmail.com",
            signCount: 1,
          },
          signDatas: [
            {
              signOrder: {
                order: 1,
                tool: "HSM",
                type: "Ký chính",
              },
              signLocation: {
                pageNumber: 1,
                locationX: 99.0959854,
                locationY: 677.8571,
              },
              signStatus: true,
              lastDateAction: "16:55 18/06/2021",
            },
          ],
        },
        {
          stt: 2,
          signInfo: {
            fullName: "chị anh",
            email: "thuyvn@vrstudio.vn",
            signCount: 1,
          },
          signDatas: [
            {
              signOrder: {
                order: 2,
                tool: "HSM",
                type: "Ký chính",
              },
              signLocation: {
                pageNumber: 1,
                locationX: 331.249329,
                locationY: 674.2895,
              },
              signStatus: true,
              lastDateAction: "16:55 18/06/2021",
            },
          ],
        },
      ],
    },
  ];

  ngOnInit() {}
}
