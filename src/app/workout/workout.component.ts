import { TimerComponent } from './../timer/timer.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../services/data.service';
@Component({
    selector: 'sm-workout',
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
    @ViewChild('repit') el: ElementRef;
    @ViewChild('repit') el2: ElementRef;
    workoutSettings;
    audio = new Audio();
    rep = '';
    reps = '';
    timeOut;
    timer;
    isDisabled = false;
    savable = false;
    workOut = {
        date: +new Date(),
        exerciseList: []
    };
    currentExercise = 0;
    constructor(
        public dialog: MatDialog,
        private db: AngularFireDatabase,
        public fireData: DataService
    ) {}

    ngOnInit() {
        this.audio.src = 'assets/sounds/signal.mp3';
        this.audio.load();
        this.workoutSettings = this.fireData.getSettings();
        this.workoutSettings.exerciseList.map(ex => {
            this.workOut.exerciseList.push({
                name: ex,
                reps: ''
            });
        });
        console.log(this.workOut.exerciseList);
        this.timeOut = this.workoutSettings.timeout;
    }
    addRep() {
        this.savable = true;
        if (this.el.nativeElement.validity.valid) {
            this.timer = setInterval(this.update.bind(this), 1000);
            this.reps = this.reps + this.rep + '/';
            this.workOut.exerciseList[this.currentExercise].reps += this.reps;
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
        if (
            this.currentExercise <
            this.workoutSettings.exerciseList.length - 1
        ) {
            this.currentExercise += 1;
            this.reps = '';

            if (
                this.currentExercise ===
                this.workoutSettings.exerciseList.length - 1
            ) {
                $event.currentTarget.disabled = true;
            }
        }
    }
    finishWorkout() {
        this.workOut.exerciseList = this.workOut.exerciseList.filter(ex => {
            return ex.reps;
        });
        this.db
            .list(this.fireData.userUID + '/lastworkouts')
            .push(this.workOut)
            .then(() => alert('Workout saved!'));
        this.workOut = {
            date: +new Date(),
            exerciseList: []
        };
        this.currentExercise = 0;
        this.reps = '';
        this.savable = false;
    }
}
