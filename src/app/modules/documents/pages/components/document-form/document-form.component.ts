import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, DocumentTypeService } from '@app/core/services';
import { Credential } from '@app/core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { USER_ACTION, TIME_PICKERS} from '@app/shared/constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogChooseDateComponent } from '@app/shared/components';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import * as moment from 'moment';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.less']
})
export class DocumentFormComponent implements OnInit {
  @Output() onFormSearch: EventEmitter<any> = new EventEmitter();
  private handlers;
  formSearch: FormGroup;
  documentsType: any;
  userAction = USER_ACTION;
  timepickers = TIME_PICKERS;
  dateFrom: any = '';
  dateTo: any = '';
  typeView :any = 0;
  
  constructor(
    private documentTypeService: DocumentTypeService,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
  )
  {
  }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      keyWord: [''],
      userAction: [null],
      documentType: [''],
      dateView: [''],
    });

    this.handlers = [
      eventEmitter.on('tabDocument:change', ({}) => {
        this.clearvalueOfForm();
      }) 
    ];

    this.loadDocumetType();
  }

  private loadDocumetType() {
    this.documentTypeService.filter().subscribe(res => {
      this.documentsType = res.data;
    });
  }

  filterDocuments() {
    this.onFormSearch.emit(this.getDataSearCh());
  }
  changeTimeView(value) {
    this.typeView = value;
    this.caculatorDate(value);
    if (value === 6) {
      this.showDialogChooseDate();
    }
  }

  private showDialogChooseDate() {
    const modal = this.modalService.create({
      nzWidth: 480,
      nzWrapClassName: 'employee-modal',
      nzTitle: 'Thời gian',
      nzContent: DialogChooseDateComponent,
      nzOnOk: (data) => console.log('Click ok', data),
      nzComponentParams: {
      }
    });

    modal.afterClose.subscribe(result => {
      if(result) {
        this.dateFrom = result.dateFrom;
        this.dateTo = result.dateTo;
        this.onFormSearch.emit(this.getDataSearCh());
      }
    });
  }

  private caculatorDate(typeDate) {
    
    switch(typeDate) {
      case 1:
        this.dateFrom = moment().subtract(0, "weeks").startOf("week").format("DD/MM/YYYY");
        this.dateTo = moment().subtract(0, "weeks").endOf("week").format("DD/MM/YYYY");
        break;
      case 2:
        this.dateFrom = moment().subtract(1, "weeks").startOf("week").format("DD/MM/YYYY");
        this.dateTo = moment().subtract(1, "weeks").endOf("week").format("DD/MM/YYYY");
        break;
      case 3:
        this.dateFrom = moment().subtract(0, "months").startOf("month").format("DD/MM/YYYY");
        this.dateTo = moment().subtract(0, "months").endOf("month").format("DD/MM/YYYY");
        break;
      case 4:
        this.dateFrom = moment().subtract(1, "months").startOf("month").format("DD/MM/YYYY");
        this.dateTo = moment().subtract(1, "months").endOf("month").format("DD/MM/YYYY");
        break;
      default:
        this.dateFrom = '';
        this.dateTo = '';
    }

    this.onFormSearch.emit(this.getDataSearCh());
  }

  private getDataSearCh() {
    const formValue = {
      ...this.formSearch.getRawValue(),
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
    }

    return formValue;
  }

  clearSearch() {
    this.clearvalueOfForm();
    this.onFormSearch.emit(this.getDataSearCh());
  }

  clearvalueOfForm() {
    this.formSearch.patchValue({
      keyWord: '',
      userAction: null,
      documentType: '',
      dateView: '',
    });

    this.dateFrom = '';
    this.dateTo = '';
    this.typeView = 0;
  }
}
