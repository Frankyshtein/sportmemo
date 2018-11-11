import { AuthguardService } from './services/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { LastworkoutsComponent } from './lastworkouts/lastworkouts.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'startworkout', canActivate: [AuthguardService], component: WorkoutComponent},
    {path: 'lastworkouts', canActivate: [AuthguardService], component: LastworkoutsComponent},
    {path: 'settings', canActivate: [AuthguardService], component: SettingsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
