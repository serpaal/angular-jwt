import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { OpenProjectComponent } from './open-project.component';



@NgModule({
  declarations: [OpenProjectComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  exports: [OpenProjectComponent]
})
export class OpenProjectModule { }
