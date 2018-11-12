import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';
import { Key } from 'protractor';

@Injectable()
export class DataService {
    onLog = new EventEmitter<boolean>();
    onNewUser = new EventEmitter<any>();
    onReady = new EventEmitter<boolean>();
    loggedIn = false;
    userUID: string;
    workoutSettings: {};
    records = [];
    sub;
    constructor(private smAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}
    init() {
        this.smAuth.user.subscribe(val => {
            if (val && !val.isAnonymous) {
                this.loggedIn = true;
                this.userUID = val.uid;
                this.sub = this.db.object(this.userUID).valueChanges().subscribe((val2: any) => {
                    if (val2 === null) {
                       this.onNewUser.emit('settings');
                       this.onReady.emit(true);
                    }
                    if (val2 != null) {
                        this.workoutSettings = val2.settings;
                        for (let elem in val2.lastworkouts) {
                            this.records.push(val2.lastworkouts[elem]);
                        };
                        this.onReady.emit(true);
                    }
                });
                this.onLog.emit(this.loggedIn);
            }
            if (val === null) {
                this.loggedIn = false;
                this.onLog.emit(this.loggedIn);
            }
        });
    }

    logIn() {
        this.onReady.emit(false);
        this.smAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(null, val2 => {
            alert('Oops, something went wrong. So try again! =)');
            this.onReady.emit(true);
        });
    }

    isLogged() { return this.loggedIn; }
    logOut() {
        this.sub.unsubscribe();
        this.smAuth.auth.signOut();
        this.loggedIn = false;
        this.workoutSettings = {};
        this.records = [];
        this.router.navigate(['']);
    }
    getSettings() {
        return this.workoutSettings;
    }
    getRecords() {
        return this.records;
    }
}
