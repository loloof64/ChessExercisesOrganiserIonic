import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'playing-page',
    loadChildren: () => import('./pages/playing-page/playing-page.module').then(m => m.PlayingPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
