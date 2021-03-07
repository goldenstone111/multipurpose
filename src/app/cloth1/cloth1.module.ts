import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cloth1PageRoutingModule } from './cloth1-routing.module';

import { Cloth1Page } from './cloth1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cloth1PageRoutingModule
  ],
  declarations: [Cloth1Page]
})
export class Cloth1PageModule {}
