import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { MainPanelComponent } from './main-panel.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService], 
    component: MainPanelComponent,
    children: [
      {
        path: 'productos',
        loadChildren: () => import('../producto/producto.module').then( m => m.ProductoModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPanelRoutingModule { }
