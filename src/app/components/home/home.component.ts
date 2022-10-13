import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/service/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count : number = 0;
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe((data_offers) => {
      this.count = data_offers.length;
    });

  }

}
