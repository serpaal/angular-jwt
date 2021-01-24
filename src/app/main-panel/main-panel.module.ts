import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPanelRoutingModule } from './main-panel-routing.module';
import { MainPanelComponent } from './main-panel.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [MainPanelComponent],
  imports: [
    CommonModule,
    MainPanelRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule
  ]
})
export class MainPanelModule { }
