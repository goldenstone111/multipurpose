import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Video3PageRoutingModule } from './video3-routing.module';

import { Video3Page } from './video3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Video3PageRoutingModule
  ],
  declarations: [Video3Page]
})
export class Video3PageModule {}
