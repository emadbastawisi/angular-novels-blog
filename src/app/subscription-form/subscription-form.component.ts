import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  isEmailValid: boolean = true;
  isSubscribed: boolean = false;
  constructor(private subService:SubscribersService) { }

  ngOnInit(): void {
  }
  onSubmit(formval: any) {
    const subData: Sub = {
      email: formval.email,
      name: formval.name,
  }
  this.subService.checkSubs(formval.email).subscribe((data) => {
    if (data.empty) {
      this.subService.addSubs(subData);
      this.isEmailValid = true;
      this.isSubscribed = true;
    }
    else {
      this.isEmailValid = false;
      this.isSubscribed = false;
    }
  })
}
}
