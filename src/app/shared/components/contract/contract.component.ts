import {Component, OnInit, OnChanges, ViewEncapsulation, Input, Output, EventEmitter  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import isEmpty from 'lodash/isEmpty';
import { ProductService } from '@app/core/services';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import format from '@app/shared/utils/format';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contract-component',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ContractComponent implements OnInit, OnChanges {
  @Input() contractForm: FormGroup;
  @Input() events: Observable<any>;
  @Input() readOnly: boolean = false;
  @Input() data: any = {};
  @Output() onFormValuesChanged: EventEmitter<any> = new EventEmitter();
  @Output() onFormValid: EventEmitter<any> = new EventEmitter();

  private handlers: any = [];
  products: any = [];
  prices: any = [];
  price: any = {};
  amount: number;
  dataStandard: string;
  useDate: string;
  dataBonus: string;
  private eventsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.handlers = [
      eventEmitter.on('formContract:validFrom', () => {        
          this.validForm();
      })
    ];

    this.contractForm = this.formBuilder.group({
      productId: [null,[Validators.required]],
      priceId: [null , [Validators.required]],
      typePayment: ['0', [Validators.required]],
    });
    
    this.formChanges();
  }

  ngOnChanges(changes) {
    if (changes.data && !isEmpty(changes.data.currentValue)) {
        this.loadDetail(this.data);
    }
  }

  private loadDetail(data) {
    const fork = [
      this.productService.getList(),
    ];

    forkJoin(fork).subscribe(([products]) => {
      this.contractForm.patchValue({
        productId: data.productId,
        priceId: data.priceId,
        typePayment: (data.typePayment || 0).toString(),
      });

      this.products = products.data;
      // this.prices = prices.data;
      
    });

  }

  private getPriceDetail(id) {
    // const priceId = id || 0;
    // return this.priceService.getById(priceId);
  }
  private loadProduct() {

    this.productService.getList().subscribe(data => {
      this.products = data.data;
    });

  }

  changeProduct(productId) {
    this.prices = [];
    this.contractForm.patchValue({
      priceId: null,
    });

    // this.priceService.getList({
    //   productId
    // }).subscribe(prices => {
    //   this.prices = prices.data;
    // });

  }

  private changePrice(id) {
    const priceId = id || 0;
    // this.priceService.getById(priceId).subscribe(data => {
    //    this.binddingDetai(data);
    // });
  }

  private binddingDetai(data) {
       this.amount = format.currency(data.amount);
       this.dataStandard = data.dataStandard;
       this.useDate = data.useDate;
       this.dataBonus= data.dataBonus;
  }

  formChanges() {
    this.contractForm.valueChanges.subscribe(value => {
      this.onFormValuesChanged.emit(value);
    });
  }

  validForm() {
    
    for (const i in this.contractForm.controls) {
      this.contractForm.controls[i].markAsDirty();
      this.contractForm.controls[i].updateValueAndValidity();
    }

    this.onFormValid.emit({result: this.contractForm.invalid});
  }
}
