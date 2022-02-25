import {SignupGuard} from './guards/signup.guard';
import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {ContactComponent} from "./contact/contact.component";


const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: SignupComponent, canActivate: [SignupGuard]},
  {path: 'profile', component: ProfileComponent, data: {requiredRoles: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
