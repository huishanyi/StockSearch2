import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
  error_message: string = "";
  color: string = 'color:';
  x_show: any;

  constructor(public activeRoute: ActivatedRoute) {
  }

  setP(params: Params) {
    this.error_message = params['error_message']
    this.x_show = params['x_show']
    this.color = 'color:' + params['color']
    // console.log(this.x_show,this.color,this.error_message)
  }

  ngOnInit(): void {
    // https://www.cnblogs.com/leiting/p/8797302.html
    this.activeRoute.queryParams.subscribe(async params => {
      await this.setP(params)
      // this.error_message="";
      //  this.color='color:';

    });
    this.x_show = false
  }
}
