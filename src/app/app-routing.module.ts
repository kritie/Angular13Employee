import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './ui/employee/employee.component';
import { HomeComponent } from './ui/home/home.component';
import { AuthGuard } from './login/auth.guard';
import { AddUpdateComponent } from './ui/employee/add-update/add-update.component';
import { ViewAllComponent } from './ui/employee/view-all/view-all.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'employee', canActivate: [AuthGuard], component: EmployeeComponent,
    children: [
      { path: 'new', component: AddUpdateComponent },
      { path: 'update', component: AddUpdateComponent },
      { path: 'view-all', component: ViewAllComponent }
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
