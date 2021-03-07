import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetmusicPageRoutingModule } from './getmusic-routing.module';

import { GetmusicPage } from './getmusic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetmusicPageRoutingModule
  ],
  declarations: [GetmusicPage]
})
export class GetmusicPageModule {}
