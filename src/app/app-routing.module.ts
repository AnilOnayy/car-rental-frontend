import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';

const routes: Routes = [
  {path:"",component : CarComponent},
  {path:"brands/add",component : BrandAddComponent},
  {path:"brands/edit/:brandId",component : BrandEditComponent},
  {path:"brands/:brandId",component : CarComponent},
  {path:"colors/add",component : ColorAddComponent},
  {path:"colors/edit/:colorId",component : ColorEditComponent},
  {path:"colors/:colorId",component : CarComponent},
  {path:"cars/add",component : CarAddComponent},
  {path:"cars/:carId",component : CarDetailComponent},
  {path:"payment/:rentalId",component : PaymentComponent},
  {path:"payment-success",component : PaymentSuccessComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
