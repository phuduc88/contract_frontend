import { Component, OnInit, OnDestroy } from '@angular/core';
import {Company } from '@app/core/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.less']
})
export class CustomersEditS2Component implements OnInit, OnDestroy {
  item: Company;
  customerId: number;
  loading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.params.id;
  }

  ngOnDestroy() {

  }   
}

