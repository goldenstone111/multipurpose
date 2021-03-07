import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cloth2Page } from './cloth2.page';

const routes: Routes = [
  {
    path: '',
    component: Cloth2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cloth2PageRoutingModule {}
