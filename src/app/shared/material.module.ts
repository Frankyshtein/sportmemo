import {
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDividerModule
} from '@angular/material';
import {
    NgModule
} from '@angular/core';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule
    ]
})
export class MaterialModule {}
