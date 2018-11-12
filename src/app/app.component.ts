import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
    init;
    ready = true;
    constructor(private fireData: DataService) {}
    ngOnInit() {
        this.fireData.init();
        this.fireData.onLog.subscribe(val => val === undefined ? val : this.init = true);
        this.fireData.onReady.subscribe(val => this.ready = val);
    }
}
