import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RankComponent } from './rank/rank.component';
import { CreateComponent } from './create/create.component';
import { CoreModule } from './core/core.module';
import { APICallService } from './apicall.service';





const routes: Routes =
  [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'rank', component: RankComponent },
    { path: 'user', component: UserComponent },
    { path: 'rank/:userName', component: RankComponent },
    { path: 'user/:userName', component: UserComponent },
    { path: 'create', component: CreateComponent},
  ]
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RankComponent,
    CreateComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CoreModule,
    

  ],
  providers: [APICallService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
