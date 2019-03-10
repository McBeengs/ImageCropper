import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectImageComponent } from './screens/select-image/select-image.component';

// IMPORTANT: Electron + Angular doesn't suport lazy-loading of Components. Make sure to add them to "app.module.ts"!
const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "select-image", component: SelectImageComponent}, // /:path

  {path: "", redirectTo: "select-image", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
