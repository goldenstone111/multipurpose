import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Video3Page } from './video3.page';

const routes: Routes = [
  {
    path: '',
    component: Video3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Video3PageRoutingModule {}
