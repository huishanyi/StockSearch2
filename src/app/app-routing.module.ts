import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WatchlistComponent} from "./components/watchlist/watchlist.component";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {ErrorpageComponent} from "./components/errorpage/errorpage.component";
import {HeaderComponent} from "./components/header/header.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {Errorpage2Component} from "./components/errorpage2/errorpage2.component";

const routes: Routes = [

  {path: '', redirectTo: 'search/home', pathMatch: 'full'},
  {path: 'search/home', component: HomePageComponent},
  {path: 'search/:id', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'search/error/NoFound', component: ErrorpageComponent},
  {path: 'search/error/NoInput', component: Errorpage2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
