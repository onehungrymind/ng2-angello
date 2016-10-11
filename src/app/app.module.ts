import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2AngelloRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { StoryboardComponent } from './components/storyboard/storyboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { NavbarComponent, EndpointConfigService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    StoryboardComponent,
    UsersComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AngelloRoutingModule
  ],
  providers: [
    EndpointConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
