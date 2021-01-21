import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequerimientosRoutingModule } from './requerimientos-routing.module';
import { RequerimientosComponent } from './requerimientos.component';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [RequerimientosComponent],
  imports: [
    CommonModule,
    RequerimientosRoutingModule,
    PanelModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class RequerimientosModule { }
