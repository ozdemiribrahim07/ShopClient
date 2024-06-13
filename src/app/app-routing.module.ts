import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashComponent } from './admin/components/dash/dash.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
    {path :"admin", component : LayoutComponent, children : [
      {path: "", component : DashComponent,canActivate : [authGuard]},
      {path : "products", loadChildren : () => import("./admin/components/products/products.module").then(m => m.ProductsModule),canActivate : [authGuard]},
      {path : "customers", loadChildren : () => import("./admin/components/customers/customers.module").then(m => m.CustomersModule),canActivate : [authGuard]},
      {path : "orders", loadChildren : () => import("./admin/components/orders/orders.module").then(m => m.OrdersModule), canActivate : [authGuard]},
    ], canActivate : [authGuard]},

    {path : "", component : HomeComponent},
    {path : "products", loadChildren : () => import("./ui/components/products/products.module").then(m => m.ProductsModule)},
    {path : "baskets", loadChildren : () => import("./ui/components/baskets/baskets.module").then(m => m.BasketsModule)},
    {path : "register", loadChildren : () => import("./ui/components/register/register.module").then(m => m.RegisterModule)},
    {path : "login", loadChildren : () => import("./ui/components/login/login.module").then(m => m.LoginModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
