import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cloth3PageRoutingModule } from './cloth3-routing.module';

import { Cloth3Page } from './cloth3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cloth3PageRoutingModule
  ],
  declarations: [Cloth3Page]
})
export class Cloth3PageModule {}
