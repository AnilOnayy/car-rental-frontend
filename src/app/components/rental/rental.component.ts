import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit{

  isLoaded = false;
  rentals : Rental[] = [];


constructor(private rentalService : RentalService) {

}

ngOnInit(): void {
    this.getRentals();
}


getRentals()
{
    this.rentalService.getCustomers().subscribe(res => {
      this.rentals = res.data;
      this.isLoaded = true;
    })
}
}
