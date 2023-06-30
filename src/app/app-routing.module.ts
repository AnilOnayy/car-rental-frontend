import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

const routes: Routes = [
  {path:"",component : CarComponent},
  {path:"brands/:brandId",component : CarComponent},
  {path:"colors/:colorId",component : CarComponent},
  {path:"car/:carId",component : CarDetailComponent},
  {path:"payment/:rentalId",component : PaymentComponent},
  {path:"payment-success",component : PaymentSuccessComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
