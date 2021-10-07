import { Component, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Jquery from 'jquery';
import { ClientService } from '@app/core/services';
@Component({
  selector: 'app-client-suggestion',
  templateUrl: './client-suggestion.component.html',
  styleUrls: ['./client-suggestion.component.less'],
})
export class ClientSuggestionComponent implements OnInit {
  typingMode = false;
  items: any;
  inputElement: any;

  @Input() item;
  @Input() productId;
  @Output() onChooseItem: EventEmitter<any> = new EventEmitter();

  constructor(
    private clientService: ClientService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.inputElement = Jquery(this.elementRef.nativeElement.parentElement).find('input');
    this.inputElement.on('focus', (event) => {
      this.typingMode = true;

      this.handleSearchItem();
    });

    this.inputElement.on('blur', (event) => {
        setTimeout(() => {
            this.typingMode = false;
        }, 500);
    });

    this.inputElement.on('keyup', (event) => {
      if (this.productId) { 
        this.selectItem({
          id: null,
          productName: this.inputElement.val(),
        })
      }

      this.handleSearchItem();
    });    
  }

  handleSearchItem() {
    this.clientService.clientSuggestion({
      name: this.inputElement.val(),
    }).subscribe((item) => {
      this.items = item;
    });
  }

  selectItem(item) {
    this.onChooseItem.emit(item);
  }

}
