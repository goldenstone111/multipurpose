import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Video2Page } from './video2.page';

const routes: Routes = [
  {
    path: '',
    component: Video2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Video2PageRoutingModule {}
