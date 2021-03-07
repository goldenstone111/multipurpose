import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cloth2PageRoutingModule } from './cloth2-routing.module';

import { Cloth2Page } from './cloth2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cloth2PageRoutingModule
  ],
  declarations: [Cloth2Page]
})
export class Cloth2PageModule {}
