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
import { DraggingService } from './components/storyboard/drag-and-drop/dragging.service';

import {
  NavbarComponent,
  EndpointConfigService ,
  UsersService,
  UtilsService,
  StoriesService,
  StatusPipe
} from './shared';
import { DragContainerDirective } from './components/storyboard/drag-and-drop/drag-container.directive';
import { DropContainerDirective } from './components/storyboard/drag-and-drop/drop-container.directive';
import { DropTargetDirective } from './components/storyboard/drag-and-drop/drop-target.directive';

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
    DragContainerDirective,
    DropContainerDirective,
    DropTargetDirective
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
    StoriesService,
    DraggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
