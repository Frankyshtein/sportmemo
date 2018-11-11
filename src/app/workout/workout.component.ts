import { AngularFireAuth } from 'angularfire2/auth';
import { TimerComponent } from './../timer/timer.component';
import {
    MatDialog
} from '@angular/material';
import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { ElementRef, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
    selector: 'sm-workout',
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
    @ViewChild('repit') el: ElementRef;
    @ViewChild('repit') el2: ElementRef;
    sub;
    sub2;
    user;
    workoutSettings = {
        exerciseList: [null],
        timeout: null};
    audio = new Audio();
    rep = '';
    reps = '';
    timeOut;
    timer;
    isDisabled = false;
    workOut = {
        date: +new Date(),
        exerciseList: []
    };
    currentExercise = 0;
    constructor(public dialog: MatDialog, private smAuth: AngularFireAuth, private db: AngularFireDatabase) {
            this.sub = this.smAuth.user.subscribe(val => {
                this.user = val.uid;
                this.sub2 = this.db.object(val.uid).valueChanges().subscribe((val2: any) => {
                    this.workoutSettings = val2.settings;
                    this.timeOut = val2.settings.timeout;
                });
            });
    }

    ngOnInit() {
        this.audio.src = 'assets/sounds/signal.mp3';
        this.audio.load();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }
     addRep() {
        if (this.el.nativeElement.validity.valid) {
            this.timer = setInterval(this.update.bind(this), 1000);
            this.reps = this.reps + this.rep + '/';
            this.workOut.exerciseList[this.currentExercise] = {name: this.workoutSettings.exerciseList[this.currentExercise],reps: this.reps};
            this.rep = '';
            this.isDisabled = true;
        }
    }
    update() {
        if (this.timeOut > 0) {
            this.timeOut -= 1;
        } else {
            const dialogRef = this.dialog.open(TimerComponent, {
                width: '250px'
            });
            dialogRef.afterClosed().subscribe(result => {
                this.audio.pause();
                this.isDisabled = false;
                this.timeOut = this.workoutSettings.timeout;
            });
            this.audio.play();
            clearInterval(this.timer);
        }
    }
    nextExercise($event) {
        if (this.currentExercise < this.workoutSettings.exerciseList.length - 1) {
            this.currentExercise += 1;
            this.reps = '';
            if (this.currentExercise === this.workoutSettings.exerciseList.length - 1) {
                $event.currentTarget.disabled = true;
            }
        }
    }
    finishWorkout() {
        this.db.list(this.user + '/lastworkouts').push(this.workOut).then(() => alert('Workout saved!'));
    }
}
