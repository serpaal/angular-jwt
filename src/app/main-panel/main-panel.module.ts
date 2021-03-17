import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { CommonModule } from '@angular/common';

import { MainPanelRoutingModule } from './main-panel-routing.module';

import { MainPanelComponent } from './main-panel.component';
import {ToolbarModule} from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [MainPanelComponent],
  imports: [
    CommonModule,
    MainPanelRoutingModule,
    NgxSpinnerModule,
    ToolbarModule,
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPanelModule { }
