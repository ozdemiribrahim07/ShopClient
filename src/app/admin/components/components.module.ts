import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { DashModule } from './dash/dash.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
    DashModule
  ]
})
export class ComponentsModule { }
