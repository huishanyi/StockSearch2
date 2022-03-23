import {Injectable} from '@angular/core';
import {Stock, Price, charts, news, dayprices, sentiment, Trends, Insights} from './Stock';
import {Observable, of, Subscription} from "rxjs";
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RouterOutlet} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchstockService {
  // stock: Stock ={} ;
  public temp: any;
  stock: Stock = {};
  prices: Price = {};
  news: news[] = [];
  peers: string[] = [];
  dayprice: dayprices = {};
  sentiment: sentiment = {};
  trends: Trends = {};
  insights: Insights = {};
  charts: charts = {};
  // returnlist={};
  // temp_term:string='AMGN';

  private stockUrl = 'http://localhost:8081/search/home';  // URL to web api
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  async searchStock(term: string): Promise<any> {
    console.log(term)
    const api = "http://localhost:8081/search" + "?symbol=" + term;
    try {
      console.log(api)
      let result = await this.http.get(api).toPromise();
      // subscribe(response => {
      console.log(result);
      this.temp = result;
      this.getinfo();
      console.log(this.temp)
      // });
      return true;
    } catch (error) {
      return false
    }
  }


  private getinfo() {
    let summary_temp = this.temp['detail']

    this.stock.ticker = summary_temp[0]['ticker']
    this.stock.name = summary_temp[0]['name']
    this.stock.ipo = summary_temp[0]['ipo']
    this.stock.exchange = summary_temp[0]['exchange']
    this.stock.weburl = summary_temp[0]['weburl']
    this.stock.finnhubInducstry = summary_temp[0]['finnhubIndustry']
    this.stock.logo = summary_temp[0]['logo']

    this.prices.Open = summary_temp[1]['o'].toFixed(2)
    this.prices.Prev = summary_temp[1]['pc'].toFixed(2)
    this.prices.High = summary_temp[1]['h'].toFixed(2)
    this.prices.Low = summary_temp[1]['l'].toFixed(2)
    this.prices.time = summary_temp[1]['t']
    this.prices.drop = summary_temp[1]['d'].toFixed(2)
    this.prices.dropP = summary_temp[1]['dp'].toFixed(2)
    this.prices.lastP = summary_temp[1]['c'].toFixed(2)
    this.prices.market_open = summary_temp[1]['market_status']
    this.prices.market_color = 'color:' + summary_temp[1]['market_color']

    if (summary_temp[1]['d'] < 0) {
      console.log('color func')
      this.prices.color = 'red'
    } else {
      this.prices.color = 'green'
    }

    let news_temp = this.temp['news']
    for (let step = 0; step < 20; step++) {
      let n_temp: news = {};
      n_temp.date = news_temp[step]['datetime']
      n_temp.img = news_temp[step]['image']
      n_temp.title = news_temp[step]['headline']
      n_temp.url = news_temp[step]['url']
      n_temp.info = news_temp[step]['summary']
      n_temp.source = news_temp[step]['source']
      this.news.push(n_temp)
    }
    this.dayprice.data = summary_temp[2]
    this.peers = summary_temp[3]

    this.charts.date = this.temp['charts']['t']
    this.charts.high = this.temp['charts']['h']
    this.charts.low = this.temp['charts']['l']
    this.charts.close = this.temp['charts']['c']
    this.charts.volume = this.temp['charts']['v']
    this.charts.open = this.temp['charts']['o']


    let temi_sent = this.temp['insights'][1]
    this.sentiment.R_p = temi_sent['Reddit']['Positive']
    this.sentiment.T_p = temi_sent['Twitter']['Positive']

    this.sentiment.R_n = temi_sent['Reddit']['Negative']
    this.sentiment.T_n = temi_sent['Twitter']['Negative']


    //trend
    let temp_trend = this.temp['insights'][0]

    this.trends.SB = temp_trend['SB']
    this.trends.S = temp_trend['S']
    this.trends.SS = temp_trend['SS']
    this.trends.B = temp_trend['B']
    this.trends.SB = temp_trend['SB']
    this.trends.T = temp_trend['T']
    this.trends.H = temp_trend['H']


    this.trends.SB = temp_trend['SB']
    this.trends.S = temp_trend['S']
    this.trends.SS = temp_trend['SS']
    this.trends.B = temp_trend['B']
    this.trends.SB = temp_trend['SB']
    this.trends.T = temp_trend['T']
    this.trends.H = temp_trend['H']
    //insights
    let temp_insi = this.temp['insights'][2]
    this.insights.actual = temp_insi['A']
    this.insights.estimate = temp_insi['E']
    this.insights.period = temp_insi['date']
    this.insights.surprise = temp_insi['S']

    console.log(this.prices)


  }

  async searchNewPrice() {
    console.log('fetching latest price of ', this.stock.ticker)
    const api_2 = "http://localhost:8081/search" + "?symbol=" + this.stock.ticker + '';
    try {
      console.log(api_2)
      let result_p = await this.http.get(api_2).toPromise();
      console.log(result_p)
      // @ts-ignore
      let price_tmp = result_p['detail']

      this.prices.Open = price_tmp[1]['o'].toFixed(2)
      this.prices.Prev = price_tmp[1]['pc'].toFixed(2)
      this.prices.High = price_tmp[1]['h'].toFixed(2)
      this.prices.Low = price_tmp[1]['l'].toFixed(2)
      this.prices.time = price_tmp[1]['t']
      this.prices.drop = price_tmp[1]['d'].toFixed(2)
      this.prices.dropP = price_tmp[1]['dp'].toFixed(2)
      this.prices.lastP = price_tmp[1]['c'].toFixed(2)
      this.prices.market_open = price_tmp[1]['market_status']
      this.prices.market_color = 'color:' + price_tmp[1]['market_color']

      if (price_tmp[1]['d'] < 0) {
        console.log('color func')
        this.prices.color = 'red'
      } else {
        this.prices.color = 'green'
      }
      return true;
    } catch (error) {
      return false
    }
  }

  // getLatestPrice(ticker: string | undefined) {
  //
  // }
  //  async getLatestPrice(term:string): Promise<any> {
  //    console.log('fetching latest price of ' ,term)
  //    const api = "http://localhost:8081/search/home" + "?symbol=" + term;
  //    try {
  //        let result = await this.http.get(api);
  //      // subscribe(response => {
  //          console.log(result);
  //          this.temp = result;
  //          this.getinfo();
  //          console.log(this.temp)
  //        // });
  //         return true;
  //      } catch (error) {
  //        return false
  //      }
  //  }
}


