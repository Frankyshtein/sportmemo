import { AngularFireDatabase } from 'angularfire2/database';
import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'sm-lastworkouts',
    templateUrl: './lastworkouts.component.html',
    styleUrls: ['./lastworkouts.component.scss']
})
export class LastworkoutsComponent implements OnInit, OnDestroy {
    sub;
    workOuts;
    constructor (private db: AngularFireDatabase, private smAuth: AngularFireAuth) {
        this.sub = smAuth.user.subscribe(val => {
            if (val) {
                this.workOuts = db.list(val.uid + '/lastworkouts').valueChanges();
            }
        });
    }

    ngOnInit() {}
    ngOnDestroy() { this.sub.unsubscribe(); }
}
