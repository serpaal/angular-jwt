import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequerimientosRoutingModule } from './requerimientos-routing.module';
import { RequerimientosComponent } from './requerimientos.component';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { CustomDatePipe } from '../pipes/custom-date.pipe';


@NgModule({
  declarations: [RequerimientosComponent, CustomDatePipe],
  imports: [
    CommonModule,
    FormsModule,
    RequerimientosRoutingModule,
    PanelModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  exports: [CustomDatePipe]
})
export class RequerimientosModule { }
