import { SetLocationPage } from './../set-location/set-location';
import { Component } from '@angular/core';
import {  ModalController, 
          LoadingController,
          ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { Geolocation } from '@ionic-native/geolocation';

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
  locationIsSet = false;

  constructor(
    private modalCtrl: ModalController,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, 
    { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location
        this.locationIsSet = true;
      }
    });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location..'
    });
    loader.present();
    this.geoLocation.getCurrentPosition()
      .then(location => {
        loader.dismiss();
        console.log(location);
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch((e) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Unable to fetch location',
          duration: 2500
        });
        toast.present();
      });
  }

}
