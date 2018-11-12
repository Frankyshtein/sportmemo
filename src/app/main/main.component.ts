import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../services/data.service';

@Component({
    selector: 'sm-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    constructor(private breakpointObserver: BreakpointObserver, public smAuth: AngularFireAuth, public fireData: DataService) {}
}
