import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { OpenProjectComponent } from './open-project.component';

@NgModule({
  declarations: [OpenProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ToastModule
  ],
  exports: [OpenProjectComponent]
})
export class OpenProjectModule { }
