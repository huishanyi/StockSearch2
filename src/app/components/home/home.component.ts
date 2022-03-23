import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {dayprices, Insights, news, Price, Stock, Trends, sentiment, charts} from '../../Stock';
import {SearchstockService} from "../../searchstock.service";
import {HttpClient} from "@angular/common/http";
import * as Highcharts from "highcharts/highstock";
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts_2 from 'highcharts';
import {NgModalComponent} from "../ng-modal/ng-modal.component";
import {timer} from "rxjs";
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';

IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  prices_2y: Price = {};
  charts: charts = {};
  stock: Stock = {};
  prices: Price = {};
  news: news[] = [];
  peers: string[] = [];
  day_price: dayprices = {};
  sentiment: sentiment = {};
  trends: Trends = {};
  insights: Insights = {};
  public temp: any;
  updateDemo2 = false;
  drop_percent = "";
  buy = false;
  display = 'display:none';
  price_color = '';
  up_down: any;
  Reddit_total: number = 0;
  Twitter_total: number = 0;
  Highcharts: typeof Highcharts = Highcharts;
  selectedIndex: number = 0;
  market: string = '';
  market_color: any;
  textcolor: any;

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  }

  chartOptions: Highcharts.Options = {
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false
    },
    exporting: {
      enabled: false
    },

    title: {
      text: this.stock.ticker + ' Stock Price'
    },
    series: [
      {
        type: 'line',
        color: '#FF0000',
        // pointInterval: 3600 * 1000,
        data: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      }
    ]
  };

  highcharts: typeof Highcharts_2 = Highcharts_2;

  // @ts-ignore
  // @ts-ignore
  chartOptions2: Highcharts_2.options = {
    chart: {
      type: 'column',
      height: 400,
      width: 500
    },
    title: {
      text: 'Recommendation Trends'
    },

    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {}
    },
    yAxis: {
      min: 0,
      title: {
        text: '#Analysis',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' millions'
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        stacking: 'normal'
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Strong Buy',
        data: [107, 31, 635, 203, 2],
        color: '#176f37'
      },
      {
        name: 'Buy',
        data: [133, 156, 947, 408, 6],
        color: '#1db954'

      },
      {
        name: 'Hold',
        data: [973, 914, 4054, 732, 34],
        color: '#b98b1d'
      },
      {
        name: 'Sell',
        data: [973, 914, 4054, 732, 34],
        color: '#f45b5b'
      },
      {
        name: 'Strong Sell',
        data: [973, 914, 4054, 732, 34],
        color: '#813131'
      }

    ]
  };

  Highcharts_3: typeof Highcharts_2 = Highcharts_2;

  // @ts-ignore
  chartOptions3: Highcharts_2.options = {
    chart: {
      type: 'spline',
      height: 400,
      width: 500
      // inverted: true
    },
    title: {
      text: 'Historical EPS Surprise'
    },
    xAxis: {
      categories: ['Africa', 'Africa', 'Africa', 'Africa']
    },

    yAxis: {
      title: {
        text: 'Quarterly EPS',
        align: 'middle'
      },
      lineWidth: 2
    },

    plotOptions: {
      spline: {
        marker: {
          enable: false
        }
      }
    },
    tooltip: {
      shared: true
    },
    series: [{
      name: 'Actual',
      data: [[0, 0], [0, 0], [0, 0], [0, 0]],
      color: '#7cb5ec',
    }, {
      name: 'Estimate',
      data: [[0, 0], [0, 0], [0, 0], [0, 0]],
      color: '#000',
    }]
  }

  Highcharts_4: typeof Highcharts = Highcharts;

  // split the data set into ohlc and volume

  ohlc: any = [];
  volume: any = [];
  groupingUnits: any = [];

  setBigChartValue() {

    // let ohlc = [],
    //   volume = [],
    // @ts-ignore
    let dataLength = this.charts.volume.length;
    // set the allowed units for data grouping
    this.groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]]
// @ts-ignore
    for (let i = 0; i < dataLength; i += 1) {
      this.ohlc.push([
        // @ts-ignore
        this.charts.date[i] * 1000, // the date
        // @ts-ignore
        this.charts.open[i], // open
        // @ts-ignore
        this.charts.high[i], // high
        // @ts-ignore
        this.charts.low[i], // low
        // @ts-ignore
        this.charts.close[i] // close
      ]);

      this.volume.push([
        // @ts-ignore
        this.charts.date[i] * 1000, // the date
        // @ts-ignore
        this.charts.volume[i] // the volume
      ]);
    }

  }

  // create the chart
  chartOptions4: Highcharts.Options = {
    rangeSelector: {
      selected: 2
    },

    title: {
      text: 'Historical'
    },

    subtitle: {
      text: 'With SMA and Volume by Price technical indicators'
    },

    yAxis: [{
      startOnTick: false,
      endOnTick: false,
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],

    tooltip: {
      split: true
    },

    plotOptions: {
      series: {
        dataGrouping: {
          units: []//groupingUnits
        }
      }
    },

    series: [{
      type: 'candlestick',
      name: 'AAPL',
      id: 'aapl',
      zIndex: 2,
      data: []//ohlc
    }, {
      type: 'column',
      name: 'Volume',
      id: 'volume',
      data: [],// volume,
      yAxis: 1
    }, {
      type: 'vbp',
      linkedTo: 'aapl',
      params: {
        volumeSeriesID: 'volume'
      },
      dataLabels: {
        enabled: false
      },
      zoneLines: {
        enabled: false
      }
    }, {
      type: 'sma',
      linkedTo: 'aapl',
      zIndex: 1,
      marker: {
        enabled: false
      }
    }]
  }
  private subscription: any;
  private polling: any;
  private nowInterval: any;


  new_data() {
    let returns: any[] = []
    // @ts-ignore
    for (let step = 0; step < this.day_price.data.length; step++) {
      // @ts-ignore
      returns.push(this.day_price.data[step])
    }
    return returns
  }

  set_chart(data: any) {
    this.updateDemo2 = true
    console.log('setchart', this.stock)
    // @ts-ignore
    this.chartOptions.series[0].data = data
    // @ts-ignore
    this.chartOptions.title.text = this.stock.ticker + ' Hourly Price Variation'
    // @ts-ignore
    console.log(this.prices.color)
    // @ts-ignore
    this.chartOptions.series[0].color = this.prices.color
    // @ts-ignore
    console.log('chart end')

    this.chartOptions2.series[0].data = this.trends.SB
    this.chartOptions2.series[1].data = this.trends.B
    this.chartOptions2.series[2].data = this.trends.H
    this.chartOptions2.series[3].data = this.trends.S
    this.chartOptions2.series[4].data = this.trends.SS
    this.chartOptions2.xAxis.categories = this.trends.T

    this.chartOptions3.series[0].data = this.insights.actual
    this.chartOptions3.series[1].data = this.insights.estimate
    // @ts-ignore
    // this.chartOptions3.xAxis.categories=this.insights.period
    let temp_cate = []
    // @ts-ignore
    for (let i = 0; i < this.insights.period?.length; i++) {
      // @ts-ignore
      temp_cate.push(this.insights.period[i].toString() + '<br>surprise:' + this.insights.surprise[i].toString())
    }
    this.chartOptions3.xAxis.categories = temp_cate
    console.log(temp_cate)
    this.setBigChartValue()


    //  plotOptions: {
    //   series: {
    //     dataGrouping: {
    //       units:
    // @ts-ignore
    this.chartOptions4.plotOptions.series.dataGrouping.units = this.groupingUnits
    // @ts-ignore
    this.chartOptions4.series[0].data = this.ohlc
    // @ts-ignore
    this.chartOptions4.series[1].data = this.volume
  }

  // @Input() stock_symbol: any;
  // @Input() acticeIndex = 0
  // private acticeIndex: number=0;


  constructor(
    private router: Router,
    private http: HttpClient,
    private stockService: SearchstockService,
    public activeRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  async start(term: string) {
    try {
      await this.cleardata()
      await this.stockService.searchStock(term)
      await this.setval()
      let data = this.new_data()
      this.set_chart(data)
    } catch (error) {
      console.log("出错了，错误原因是", error)
    }

  };


  cleardata(): void {
    console.log('clear data')
    // this.stock = {};
    // this.prices = {};
    // this.news = [];
    // this.peers = [];
    // this.day_price = {};
    // this.sentiment = {};
    // this.trends = [];
    // this.insights = [];
    this.textcolor = '';
    this.up_down = '';
    this.price_color = '';
    this.stockService.stock = {};
    this.stockService.prices = {};
    this.stockService.news = [];
    this.stockService.peers = [];
    this.stockService.dayprice = {};
    this.stockService.sentiment = {};
    this.stockService.trends = {};
    this.stockService.insights = {};

  }

  // Highcharts: typeof Highcharts = Highcharts;

  setval() {
    console.log('setvallue')
    this.stock = this.stockService.stock;
    this.prices = this.stockService.prices;
    this.news = this.stockService.news;
    this.sentiment = this.stockService.sentiment;
    this.day_price = this.stockService.dayprice;
    this.insights = this.stockService.insights;
    this.trends = this.stockService.trends;
    this.drop_percent = '(' + this.prices.dropP + '%)';
    this.display = 'display:initial';
    this.charts = this.stockService.charts;
    // @ts-ignore
    this.Reddit_total = this.sentiment.R_n + this.sentiment.R_p
    // @ts-ignore
    this.Twitter_total = this.sentiment.T_p + this.sentiment.T_n
    this.peers = this.stockService.peers;
    this.buy = true;
    this.price_color = 'color:' + this.prices.color
    // @ts-ignore
    if (this.prices.drop < 0) {
      this.textcolor = 'text-danger'
      this.up_down = false
    } else {
      this.textcolor = 'text-success'
      this.up_down = true
    }
    console.log('value set done', this.peers)
    return true

  }

  // @ts-ignore
  private now: Date;
  // @ts-ignore
  private startTime: Date;
  watch: any;

  ngOnInit(): void {
    let sub = this.activeRoute.params.subscribe(params => {
      this.buy = false
      console.log(params)
      this.start(params['id'])
      // this.pollData();
    });
    this.now = new Date();
    this.startTime = new Date();
    this.runTimer();

  }


  async getLatestPrice() {
    // @ts-ignore
    try {
      await this.stockService.searchNewPrice()
      this.prices = this.stockService.prices;
      this.price_color = 'color:' + this.prices.color
      // @ts-ignore
      if (this.prices.drop < 0) {
        this.textcolor = 'text-danger'
        this.up_down = false
      } else {
        this.textcolor = 'text-success'
        this.up_down = true
      }
      console.log(this.prices.lastP)
    } catch (error) {
      console.log("出错了，错误原因是", error)
    }
  }

  open(p: any) {
    const modalRef = this.modalService.open(NgModalComponent);
    modalRef.componentInstance.new = p;
  }

  runTimer() {
    this.nowInterval = setInterval(async () => {
      if (this.buy) {
        if (new Date().getTime() - this.startTime.getTime() > 15000) {
          // console.log(this.now);
          try {
            await this.getLatestPrice();
          } catch (error) {
            console.log(error)
          }
        }
      }
      this.now = new Date();
    }, 15000);
  }

  ngOnDestroy() {
    clearInterval(this.nowInterval);
  }

  AdjustWatch() {
    // if(this.stock.ticker)
  }

  BuyStock() {

  }
}
