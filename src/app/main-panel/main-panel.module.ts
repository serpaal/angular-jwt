import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPanelRoutingModule } from './main-panel-routing.module';
import { MainPanelComponent } from './main-panel.component';


@NgModule({
  declarations: [MainPanelComponent],
  imports: [
    CommonModule,
    MainPanelRoutingModule
  ]
})
export class MainPanelModule { }
