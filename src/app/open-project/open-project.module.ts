import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OpenProjectComponent } from './open-project.component';

@NgModule({
  declarations: [OpenProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    DropdownModule
  ],
  exports: [OpenProjectComponent]
})
export class OpenProjectModule { }
