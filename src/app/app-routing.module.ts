import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StacksComponent } from './stacks/stacks.component';
import { MonitoringComponent } from './monitoring/monitoring.component';


const routes: Routes = [
  { path: '', redirectTo: '/stacks', pathMatch: 'full' },
  { path: 'stacks', component: StacksComponent },
  { path: 'monitoring', component: MonitoringComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
