import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
  
const routes: Routes = [
  { path: '', redirectTo: 'post/index', pathMatch: 'full'},
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }