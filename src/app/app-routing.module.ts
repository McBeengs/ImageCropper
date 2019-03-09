import { ActionComponent } from './screens/action/action.component';
import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTANT: Electron + Angular doesn't suport lazy-loading of Components. Make sure to add them to "app.module.ts"!
const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "action", component: ActionComponent},

  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
