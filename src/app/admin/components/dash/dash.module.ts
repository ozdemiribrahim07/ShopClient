import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashComponent }
    ])
  ]
})
export class DashModule { }
