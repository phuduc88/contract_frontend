import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from '@app/core/services';
import { PAGE_SIZE, STATUS, ACTION, ROLE, DOCUMENTSTATUS } from '@app/shared/constant';
import { getBirthDay } from '@app/shared/utils/custom-validation';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contract-search-list',
  templateUrl: './contract-search-list.component.html',
  styleUrls: ['./contract-search-list.component.less']
})
export class ContractSearchListComponent implements OnInit, OnDestroy {
  documents: any = {};
  total: number;
  skip: number;
  formSearch: FormGroup;
  sortName: string = '';
  selectedPage: number = 1;
  keyword: string ='';
  status: any = DOCUMENTSTATUS;
  shortColumn: any = {
    key: '',
    value: ''
  };
  isSpinning: boolean = false;

  contracts: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      keyword: [''],
      dateFrom: [''],
      dateTo: [''],
    });

    this.getContracts();
  }

  filter: any = {
    name: '',
    tax: '',
    delegate: '',
    active: ''
  };

  handleFilter(key) {
    this.keyword = this.filter[key];
    this.getContracts();
  }

  private getContracts(skip = 0, take = PAGE_SIZE) {
    
  }

  sort(event) {
    this.shortColumn = event;
    this.getContracts();
  }


  get dateTo() {
    const dateTo = this.formSearch.get('dateTo').value;

    if (!dateTo) return '';

    const birth = getBirthDay(dateTo, false, false);

    return birth.format;
  }

  get dateFrom() {
    const dateFrom = this.formSearch.get('dateFrom').value;
    if (!dateFrom) return '';

    const birth = getBirthDay(dateFrom, false, false);

    return birth.format;
  }

  delete(id) {
    this.contractService.delete(id).subscribe(() => {
      this.getContracts(this.skip);
    });
  }

  redNew(id) {
    
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn làm mới hơp đồng?',
      nzOkText: 'Làm mới',
      nzCancelText: 'Không',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.contractService.rednew(id).subscribe(data => {
          this.getContracts(this.skip);
        });
      }
    });
   
  }

  handleSearchBox() {
    this.getContracts();
  }

  ngOnDestroy() {

  }

  download(contractId) {
    
  }
}

