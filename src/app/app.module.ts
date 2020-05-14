import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthGuardService} from './auth-guard.service';
import { CanActivate } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';
import {AuthLoginService} from './auth-login.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { LogoutComponent } from './logout/logout.component';
import { OnlineusersComponent } from './onlineusers/onlineusers.component';
import { ScrollchatDirective } from './scrollchat.directive';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReconnectComponent } from './reconnect/reconnect.component';

const appRoutes: Routes = [
{path:'chat', component: ChatComponent,canActivate:[AuthGuardService], },
{path:"", redirectTo:'/home', pathMatch:'full'},
{path:"accedi", component:LoginComponent, canActivate:[AuthLoginService],data: {animation:'accedi'}},
{path:"registrazione", component:RegisterComponent,canActivate:[AuthLoginService],data: {animation:'registrati'}},
{path:"home", component:HomeComponent,canActivate:[AuthLoginService],data: {animation:'home'}},
{path:'logout', component:LogoutComponent,canActivate:[AuthGuardService],data: {animation:'logout'}},
{path:'**', redirectTo:'/home'},

];
@NgModule({
  declarations: [

    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ChatSidebarComponent,
    LogoutComponent,
    OnlineusersComponent,
    ScrollchatDirective,
    RoomsComponent,
    ReconnectComponent,
  ],
  imports: [

    BrowserModule,
       BrowserAnimationsModule,
    NgScrollbarModule,
ReactiveFormsModule,
FormsModule,
RouterModule.forRoot(
  appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
  BrowserModule,
  HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
