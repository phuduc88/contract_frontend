import { AfterViewInit, Component, Input,Output, OnDestroy,OnChanges, OnInit,EventEmitter } from "@angular/core";
import { Credential } from '@app/core/models';

@Component({
  selector: 'tab-signature',
  templateUrl: './tab-signature.component.html',
  styleUrls: ['tab-signature.component.less']
})
export class TabSignatureComponent implements OnInit, OnDestroy, OnChanges,AfterViewInit {
  @Input() signPadOfUser: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() useDefault : EventEmitter<any> = new EventEmitter();
  @Output() changeSingPad : EventEmitter<any> = new EventEmitter();
  imageOption: any = {};
  user: Credential;
  signPadDefault: any = {};
   
  ngAfterViewInit() {
    
  }
  ngOnDestroy(){

  }
  ngOnInit() {
     this.imageOption = {
      width: 164,
      height: 82
     }
  }

  ngOnChanges(changes) {
    if (changes && changes.signPadOfUser.currentValue && changes.signPadOfUser.currentValue.length) { 
       this.getSignPadDefault(changes.signPadOfUser.currentValue);
    }
  }

  
  private getSignPadDefault(source) {
    const signPadDefault = source.find(c => c.useDefault);
   
    if(signPadDefault) {
      this.signPadDefault = signPadDefault;
    } else {
      this.signPadDefault = {
        data: null,
      };
    }
  }

  openSignaturePad() {
    this.changeSingPad.emit(this.signPadDefault);
  }

  deleteSignature(item) {
    this.delete.emit(item);
  }

  setDefaultSignature(item) {
    this.useDefault.emit(item);
  }

}
