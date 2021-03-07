import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cloth1',
    loadChildren: () => import('./cloth1/cloth1.module').then( m => m.Cloth1PageModule)
  },
  {
    path: 'cloth2',
    loadChildren: () => import('./cloth2/cloth2.module').then( m => m.Cloth2PageModule)
  },
  {
    path: 'cloth3',
    loadChildren: () => import('./cloth3/cloth3.module').then( m => m.Cloth3PageModule)
  },
  {
    path: 'video1',
    loadChildren: () => import('./video1/video1.module').then( m => m.Video1PageModule)
  },
  {
    path: 'getmusic',
    loadChildren: () => import('./getmusic/getmusic.module').then( m => m.GetmusicPageModule)
  },
  {
    path: 'video2',
    loadChildren: () => import('./video2/video2.module').then( m => m.Video2PageModule)
  },
  {
    path: 'video3',
    loadChildren: () => import('./video3/video3.module').then( m => m.Video3PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
