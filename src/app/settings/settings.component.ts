import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../services/data.service';

@Component({
  selector: 'sm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @ViewChild('newExercise') inputExercise: ElementRef;
    @ViewChild('newTimeout') inputTimeout: ElementRef;
    exercise = '';
    timeOut = '';
    settings;
  constructor(private db: AngularFireDatabase, public fireData: DataService) { }

  ngOnInit() {
    this.settings = this.fireData.getSettings() || {exerciseList: [ ], timeout: 60};
    console.log(this.settings);
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
        this.db.object(this.fireData.userUID + '/settings').set(this.settings).then(() => alert('Saved!'));
    }
}
