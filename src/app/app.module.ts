import { AuthguardService } from './services/auth-guard.service';
import { environment } from './../environments/environment';
import { TimerComponent } from './timer/timer.component';
import { MaterialModule } from './shared/material.module';

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { LastworkoutsComponent } from './lastworkouts/lastworkouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SettingsComponent,
    LastworkoutsComponent,
    WorkoutComponent,
    TimerComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  entryComponents: [TimerComponent],
  providers: [AngularFireAuth, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
