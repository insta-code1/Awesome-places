import { PlacesService } from './../../services/places.service';
import { Place } from './../../models/place';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Place page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Place');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesService.deletePLace(this.index);
    this.onLeave();
  }
}
