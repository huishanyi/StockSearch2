import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HighchartsChartModule} from 'highcharts-angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonComponent} from './components/button/button.component';
import {ErrorpageComponent} from './components/errorpage/errorpage.component';
import {FavoratesComponent} from './components/favorates/favorates.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {MessagesComponent} from './components/messages/messages.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {WatchlistComponent} from './components/watchlist/watchlist.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {NavbarComponent} from './components/navbar/navbar.component';
// import { HighchartsChartComponent } from 'highcharts-angular';
import {FormsModule} from '@angular/forms';
import {NgModalComponent} from "./components/ng-modal/ng-modal.component";
import {HomePageComponent} from './components/home-page/home-page.component';
import {Errorpage2Component} from './components/errorpage2/errorpage2.component';


// import { HighchartsChartModule } from 'highcharts-angular';
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    HomeComponent,
    WatchlistComponent,
    PortfolioComponent,
    MessagesComponent,
    ErrorpageComponent,
    FavoratesComponent,
    NavbarComponent,
    NgModalComponent,
    HomePageComponent,
    Errorpage2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    CommonModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    HighchartsChartModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
