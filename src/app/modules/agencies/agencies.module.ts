import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthenticationService } from '@app/core/services';
import { SharedModule } from '@app/shared/shared.module';
import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesListComponent, AgenciesAddComponent, AgenciesEditComponent, AgenciesComponent } from './pages';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgenciesRoutingModule,
    NzButtonModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzTableModule,
    NzRadioModule,
    NzIconModule,
    NzCheckboxModule,
    SharedModule,
    NzSpinModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AgenciesListComponent,
    AgenciesAddComponent,
    AgenciesEditComponent,
    AgenciesComponent
  ],
  providers: [
    AuthenticationService
  ],
  entryComponents: []
})
export class AgenciesModule { }
