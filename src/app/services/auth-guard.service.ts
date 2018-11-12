import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class AuthguardService implements CanActivate {
    constructor(private fireData: DataService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.routeConfig.path === 'startworkout' && !this.fireData.getSettings() && this.fireData.loggedIn) {
            alert('Add some exercises first!');
            return false;
        }
        return this.fireData.loggedIn;
    }
}
