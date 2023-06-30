import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/rental';
import { CreditCardDirectivesModule, CreditCardValidators } from 'angular-cc-library';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  rentalDetails:Rental

  totalPrice: number
  rentalId : number

  cardNumber:string
  expirationDate:string
  securityCode:number




  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router : Router,
  ) {}




  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["rentalId"] == null) {
        this.router.navigateByUrl("/");

      }
      else{
        this.rentalId = params["rentalId"];
        this.getDetails();
      }
    })
  }

  getDetails() {
      this.paymentService.getRentalDetails(this.rentalId).subscribe(res => {
        this.totalPrice = res.data.price;
      },
        error => {
          this.router.navigateByUrl("/");
        }
      );
  }

  pay()
  {
    // some credit card validations..
    if(true)
    {
      this.paymentService.pay(this.cardNumber,this.expirationDate,this.securityCode,this.rentalId,this.totalPrice).subscribe(res =>{
          this.router.navigateByUrl('/payment-success')
      } )
    }


  }


}
