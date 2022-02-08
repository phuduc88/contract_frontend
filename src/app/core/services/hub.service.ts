import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventEmitter } from '@app/shared/utils/event-emitter';
import { ApplicationHttpClient } from '@app/core/http';
import { hubConnection, signalR } from 'signalr-no-jquery';
import { hubConfig } from '@app/shared/constant';
import { errorMessages } from '@app/shared/constant';
@Injectable({ providedIn: 'root' })
export class HubService {

  private hubProxy: any;
  constructor(private http: ApplicationHttpClient) {
  }

  public connectHub(callBack) {
    const options = {
        crossDomain: true,
        'Content-Type': 'application/json',
        'Accept':'*/*'
		};

    // const conn = new signalR.HubConnection('/signalr', {
    //   headers: {
    //       'Accept-Language': 'en-US'
    //   }
    // });
    // const connectionHub = hubConnection(hubConfig.host, options);
    const connectionHub = hubConnection(hubConfig.host);
    const hubProxy = connectionHub.createHubProxy(hubConfig.hubProxy);
    hubProxy.on(hubConfig.notificeEvent, (result) => {
      callBack(this.convertToObject(result));
    });

    connectionHub.start()
    .done((data: any) =>{        
        console.log('Now connected, connection ID=' + connectionHub.id);  
        this.hubProxy = hubProxy;
    })
    .fail((data: any) => {  
      console.log('Could not connect');
      this.hubProxy = null;
    });

    connectionHub.disconnected(function() {
      connectionHub.stop();
    });
  }

  public getHubProxy() {
    return this.hubProxy;
  }

  private convertToObject(result) {
    const data = JSON.parse(result);
    if (data.code === 1) {
      return data.data;
    }

    throw {
      code: data.code,
      message: this.getMessageErrorByErrorCode(data.code),
    };
  }

  private getMessageErrorByErrorCode(errorCode) {
    const message = errorMessages[errorCode];

    if (!message) {
      eventEmitter.emit('saveData:error', errorMessages[8]);
      return errorMessages[8];
    }

    eventEmitter.emit('saveData:error', message);
    return message;
  }
   
}
