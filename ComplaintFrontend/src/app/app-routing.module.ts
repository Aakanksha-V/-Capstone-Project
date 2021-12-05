import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { AddComplaintComponent } from './Screens/add-complaint/add-complaint.component';
import { LoginComponent } from './Screens/login/login.component';
import { UserViewComponent } from './Screens/user-view/user-view.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"addComplaint",component:AddComplaintComponent},
  {path:'admin/access',component:UserViewComponent},
  {path:'',component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
