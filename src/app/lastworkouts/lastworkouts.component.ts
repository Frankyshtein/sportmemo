import { AngularFireDatabase } from 'angularfire2/database';
import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../services/data.service';

@Component({
    selector: 'sm-lastworkouts',
    templateUrl: './lastworkouts.component.html',
    styleUrls: ['./lastworkouts.component.scss']
})
export class LastworkoutsComponent implements OnInit, OnDestroy {
    workOuts;
    constructor (public fireData: DataService) {
    }
    ngOnInit() {
        this.workOuts = this.fireData.getRecords();
    }
    ngOnDestroy() {}
}
