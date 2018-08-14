import {
    Component
} from '@angular/core';
import {
    MatDialogRef
} from '@angular/material';


@Component({
    selector: 'sm-timer',
    templateUrl: 'timer.component.html',
    styles: ['div { text-align: center; }h2 { text-align: center; }']
})
export class TimerComponent {
    constructor(
        public dialogRef: MatDialogRef < TimerComponent >) {
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
