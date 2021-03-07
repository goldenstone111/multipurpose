import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetmusicPage } from './getmusic.page';

const routes: Routes = [
  {
    path: '',
    component: GetmusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetmusicPageRoutingModule {}
