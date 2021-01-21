import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';

import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [ProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    TableModule
  ]
})
export class ProductoModule { }
