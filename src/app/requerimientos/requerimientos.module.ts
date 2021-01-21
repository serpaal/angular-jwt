import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequerimientosRoutingModule } from './requerimientos-routing.module';
import { RequerimientosComponent } from './requerimientos.component';


@NgModule({
  declarations: [RequerimientosComponent],
  imports: [
    CommonModule,
    RequerimientosRoutingModule
  ]
})
export class RequerimientosModule { }
