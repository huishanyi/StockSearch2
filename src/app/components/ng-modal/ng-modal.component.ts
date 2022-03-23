import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {news} from "../../Stock";

@Component({
  selector: 'app-ng-modal',
  templateUrl: './ng-modal.component.html',
  styleUrls: ['./ng-modal.component.css']
})
export class NgModalComponent implements OnInit {

  @Input() new: news = {};

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
