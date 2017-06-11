import { PlacesService } from './../../services/places.service';
import { SetLocationPage } from './../set-location/set-location';
import { Component } from '@angular/core';
import {  ModalController, 
          LoadingController,
          ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, FileError, Entry } from '@ionic-native/file';
import { Location } from './../../models/location';

declare var cordova: any;


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
  imageUrl: string = '';

  constructor(
    private modalCtrl: ModalController,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File) {
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
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

  onTakePhoto() {
    // Camera.getPicture({
    //   encodingType: Camera.EncodingType.JPEG,
    //   correctOrientation: true
    // })  when not using mock photo data
    this.camera.getPicture()
      .then((imageData) => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpeg';
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then((data: Entry) => {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
            this.file.removeFile(path, currentName);
          })
          .catch((e: FileError) => {
            const toast = this.toastCtrl.create({
              message: 'Could not save image. Please try again',
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          });
        this.imageUrl = imageData;
      })
      .catch((e) => {
        const toast = this.toastCtrl.create({
          message: 'Could not take the image. Please try again',
          duration: 2500
        });
        toast.present();
      });
  }


}
