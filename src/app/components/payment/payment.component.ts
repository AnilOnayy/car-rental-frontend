import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { CreditCardValidator } from 'ng2-cc-library';
import { Rental } from 'src/app/models/rental';

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
  ) {}




  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["rentalId"] != null) {
        this.rentalId = params["rentalId"];
        this.getDetails();
      }
    })
  }

  getDetails() {
      this.paymentService.getRentalDetails(this.rentalId).subscribe(res => {

      });
  }

  pay()
  {

  }


}
