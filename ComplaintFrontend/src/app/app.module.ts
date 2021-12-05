import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComplaintComponent } from './Screens/add-complaint/add-complaint.component';
import { LoginComponent } from './Screens/login/login.component';
import { UserViewComponent } from './Screens/user-view/user-view.component';
import { ViewComplaintComponent } from './Screens/view-complaint/view-complaint.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddComplaintComponent,
    LoginComponent,
    UserViewComponent,
    ViewComplaintComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
