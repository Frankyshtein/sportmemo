import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthguardService implements CanActivate {
    sub;
    state;
    constructor(private smauth: AngularFireAuth) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.sub = this.smauth.authState.subscribe((val: any) => {
            if (val && !val.isAnonymous) {
                // console.log('hey');
                // this.sub.unsubscribe();
                this.state = true;
            } else {
                // this.sub.unsubscribe();
                this.state = false;
            }
        });
        return this.state;
    }
}
