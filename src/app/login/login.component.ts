import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../services/data.service';

@Component ({
  selector: 'sm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loggedIn: boolean;
    loginPath = 'startworkout';
  constructor(public smAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase, public fireData: DataService) {}

  ngOnInit() {
    this.loggedIn = this.fireData.isLogged();
    this.fireData.onLog.subscribe(val => this.loggedIn = val);
    this.fireData.onNewUser.subscribe(val => this.loginPath = val);
}
  ngOnDestroy() {
    //this.fireData.onLog.unsubscribe();
    //this.fireData.onNewUser.unsubscribe();
  }
    goNext() {
        this.router.navigate([this.loginPath]);
    }
}
