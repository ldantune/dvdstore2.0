import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {IMaskModule} from 'angular-imask';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    IMaskModule,

  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    IMaskModule
  ]
})
export class ComumModule { }
