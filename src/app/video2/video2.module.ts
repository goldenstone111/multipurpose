import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Video2PageRoutingModule } from './video2-routing.module';

import { Video2Page } from './video2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Video2PageRoutingModule
  ],
  declarations: [Video2Page]
})
export class Video2PageModule {}
