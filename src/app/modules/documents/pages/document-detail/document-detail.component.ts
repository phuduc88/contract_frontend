import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: "app-document-detail",
  templateUrl: "./document-detail.component.html",
  styleUrls: ["./document-detail.component.less"],
})
export class DocumentDetailComponent implements OnInit {
  constructor(
    private router:Router,
  ) { }
  ngOnInit() {}

  back() {
    this.router.navigate(['/manage-documents/']);
  }
}
