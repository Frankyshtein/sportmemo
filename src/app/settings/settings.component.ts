import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'sm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @ViewChild('newExercise') inputExercise: ElementRef;
    @ViewChild('newTimeout') inputTimeout: ElementRef;
    sub;
    sub2;
    sub3;
    exercise = '';
    timeOut = '';
    settings = {exerciseList: [ ], timeout: 60};
  constructor(private db: AngularFireDatabase, private smAuth: AngularFireAuth) { }

  ngOnInit() {
    this.sub2 = this.smAuth.user.subscribe(val => {
        this.sub = this.db.object(val.uid + '/settings').valueChanges().subscribe((val2: any) => {
              if (val2) {
                  this.settings.exerciseList = val2.exerciseList;
                  this.settings.timeout = val2.timeout;
                  this.sub.unsubscribe();
                  this.sub2.unsubscribe();
              } else {
                this.sub.unsubscribe();
                this.sub2.unsubscribe();
              }
          });
      });
  }
  removeExercise ($event) {
      const elem = this.settings.exerciseList.indexOf($event.target.previousSibling.innerText);
      this.settings.exerciseList.splice(elem, 1);
  }
  addExercise() {
      if (this.inputExercise.nativeElement.validity.valid) {
          this.settings.exerciseList.push(this.exercise);
          this.exercise = '';
      }
  }
  changeTimeout() {
    if (this.inputTimeout.nativeElement.validity.valid) {
        this.settings.timeout = +this.timeOut;
        this.timeOut = '';
    }
}
    save() {
        this.sub3 = this.smAuth.user.subscribe(val => {
            this.db.object(val.uid + '/settings').set(this.settings).then(() => {
                alert('Saved!');
                this.sub3.unsubscribe();
            } );
        });
    }


}
