import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Stock} from "../../Stock";
import {RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NgModalComponent} from "../ng-modal/ng-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title: string = 'STOCK SEARCH';
  stock: Stock = {};
  stock_symbol: string = '';
  // @Input() stock_symbol: string | undefined;

  public data: any;

  private url: string = 'https://csci571hw8-57108.wl.r.appspot.com/search/';

  constructor(
    private router: Router,
    private http: HttpClient,
    public activeRoute: ActivatedRoute,
    // public searchHome:HomeComponent
    private modalService: NgbModal
  ) {
  }

  turn_to_error_alert(wrong: number): void {
    if (wrong == 1) {
      this.router.navigate(['search/error/NoFound'])
    } else {
      this.router.navigate(['search/error/NoInput'])
    }
  }


  searchStock(): void {

    if (this.stock_symbol == '') {
      this.turn_to_error_alert(1);
    } else {
      var api = "http://localhost:8081/search/home" + "?symbol=" + this.stock_symbol;
      console.log(api)
      this.http.get(api).subscribe(response => {
        if (response == null) {
          this.turn_to_error_alert(0);
        } else {
          console.log(response);
          // @ts-ignore
          console.log(this.stock_symbol)
          this.router.navigate(['search/', this.stock_symbol.toUpperCase()])
        }
      });

    }
  }

  open() {
    const modalRef = this.modalService.open(NgModalComponent);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit(): void {
    this.stock_symbol = ''
  }

  clear() {
    this.stock_symbol = ''
  }
}
