import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    /*children: [
      {
        path: '',
        component: GridProductoComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
