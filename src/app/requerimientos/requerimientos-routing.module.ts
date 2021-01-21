import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientosComponent } from './requerimientos.component';

const routes: Routes = [
  {
    path: '',
    component: RequerimientosComponent,
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
export class RequerimientosRoutingModule { }
