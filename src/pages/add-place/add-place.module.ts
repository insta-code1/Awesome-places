import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place'; 

@NgModule({
  declarations: [
    AddPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlacePage),
  ],
  exports: [
    AddPlacePage
  ]
})
export class AddPlaceModule {}
