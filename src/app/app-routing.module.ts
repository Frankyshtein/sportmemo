import { SettingsComponent } from './settings/settings.component';
import { LastworkoutsComponent } from './lastworkouts/lastworkouts.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { WorkoutComponent } from './workout/workout.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'main', component: MainComponent, children: [
        {path: 'startworkout', component: WorkoutComponent},
        {path: 'lastworkouts', component: LastworkoutsComponent},
        {path: 'settings', component: SettingsComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
