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
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlreadyLoginGuard } from './guards/already-login.guard';

const routes: Routes = [
  {path:"",component : CarComponent},

  {path:"brands/add",component : BrandAddComponent , canActivate : [LoginGuard]},
  {path:"brands/edit/:brandId",component : BrandEditComponent , canActivate : [LoginGuard]},
  {path:"brands/:brandId",component : CarComponent },

  {path:"colors/add",component : ColorAddComponent , canActivate : [LoginGuard]},
  {path:"colors/edit/:colorId",component : ColorEditComponent , canActivate : [LoginGuard]},
  {path:"colors/:colorId",component : CarComponent },

  {path:"cars/add",component : CarAddComponent , canActivate : [LoginGuard]},
  {path:"cars/edit/:carId",component : CarEditComponent , canActivate : [LoginGuard]},
  {path:"cars/:carId",component : CarDetailComponent},

  {path:"payment/:rentalId",component : PaymentComponent, canActivate : [LoginGuard]},
  {path:"payment-success",component : PaymentSuccessComponent, canActivate : [LoginGuard]},

  {path:"register",component : RegisterComponent ,canActivate : [AlreadyLoginGuard]},
  {path:"login",component : LoginComponent , canActivate : [AlreadyLoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
