import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { IncidentesComponent } from './incidentes.component';

import {TableModule} from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [IncidentesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IncidentesRoutingModule,
    PanelModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    ProgressBarModule
  ]
})
export class IncidentesModule { }
