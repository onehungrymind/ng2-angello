import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { Ng2AngelloRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { StoryboardComponent } from './components/storyboard/storyboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { ChartDirective } from './components/dashboard/chart.directive';

import {
  NavbarComponent,
  EndpointConfigService ,
  UsersService,
  UtilsService,
  StoriesService,
  StatusPipe
} from './shared';
import { UserStoryDirective } from './components/storyboard/user-story.directive';

const firebaseConfig = {
  apiKey: "AIzaSyAitFUM94AHlau3g7DUVCn5UNOwPGDpdxQ",
  authDomain: "my-first-angello.firebaseapp.com",
  databaseURL: "https://my-first-angello.firebaseio.com",
  storageBucket: "my-first-angello.appspot.com",
  messagingSenderId: "969593256234"
};

const angularFireConfig = AngularFireModule.initializeApp(
  firebaseConfig
);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    StoryboardComponent,
    UsersComponent,
    UserComponent,
    NavbarComponent,
    ChartDirective,
    StatusPipe,
    UserStoryDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2AngelloRoutingModule,
    angularFireConfig
  ],
  providers: [
    EndpointConfigService,
    UsersService,
    UtilsService,
    StoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
