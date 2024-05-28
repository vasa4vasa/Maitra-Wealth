import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './maitra/navbar/navbar.component';
import { DashboardComponent } from './maitra/dashboard/dashboard.component';
import { UsersComponent } from './maitra/users/users.component';
import { TipsComponent } from './maitra/tips/tips.component';
import { MessageComponent } from './maitra/message/message.component';
import { LevelsComponent } from './maitra/levels/levels.component';


const routes: Routes = [
  { path: '', component: NavbarComponent, children: [
    { path: 'dash', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'tips', component: TipsComponent },
    { path: 'message', component: MessageComponent }, 
    { path: 'levels', component: LevelsComponent },
    { path:'', redirectTo: '/navbar/dash', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaitraRoutingModule { }
