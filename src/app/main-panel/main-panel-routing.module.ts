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
        path: 'requerimientos',
        loadChildren: () => import('../requerimientos/requerimientos.module').then( m => m.RequerimientosModule),
      },
      {
        path: 'incidentes',
        loadChildren: () => import('../incidentes/incidentes.module').then( m => m.IncidentesModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPanelRoutingModule { }
