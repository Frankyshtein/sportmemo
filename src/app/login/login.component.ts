import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component ({
  selector: 'sm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loggedIn = false;
    sub;
    loginPath = 'main/startworkout';
  constructor(private smAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {}

  ngOnInit() {
      this.smAuth.user.subscribe(val => {
          if (val && !val.isAnonymous) {
              this.loggedIn = true;
          }
      });
  }
  ngOnDestroy() {
      this.sub.unsubscribe();
  }
    logIn() {
        this.smAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
            this.loggedIn = true;
            this.smAuth.user.subscribe(val => {
                if (val) {
                    this.sub = this.db.object(val.uid).valueChanges().subscribe(val2 => {
                        if (!val2) {
                            this.loginPath = 'main/settings';
                        }
                    });
                }
            });
        });
    }
    goNext() {
        this.router.navigate([this.loginPath]);
    }
}
