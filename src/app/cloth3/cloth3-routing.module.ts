import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cloth3Page } from './cloth3.page';

const routes: Routes = [
  {
    path: '',
    component: Cloth3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cloth3PageRoutingModule {}
