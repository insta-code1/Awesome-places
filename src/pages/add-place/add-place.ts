import { SetLocationPage } from './../set-location/set-location';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { Location } from './../../models/location';


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  constructor(private modalCtrl: ModalController) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location });
    modal.present();
  }

}
