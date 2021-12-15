import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CrudEmployeeService } from '../../services/utils/crud-employee.service';
import { StorageService } from '../../core/session-management/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly API_URL = 'http://localhost:3000';

  public employees: Employee[] = [];

  constructor(private http: HttpClient, private loginSvc: LoginService, private router: Router,
    private empSvc: CrudEmployeeService, private storage: StorageService) { }

  async getAllEmployees() {
    this.http.get<{message: string, employees: Employee[]}>(`${this.API_URL}/api/employees`)
      .subscribe((data) => {
        this.employees = data.employees;
    });
  }

  loginEmployee(formdata: any) {
    this.http.post(`${this.API_URL}/api/login`, { formdata: formdata }).subscribe({
      next: (res: any) => {
        if(res['token']) {
          this.storage.setJWTToken(res);
          this.empSvc.emp.isLoggedIn = true;
          this.empSvc.emp.data = res.employee;
          this.router.navigate(['/employee']);
        }
      },
      error: () => {
        this.empSvc.emp.isLoggedIn = false;
        this.empSvc.emp.data = {};
        console.log('this is error from server');
      }
    });
  }

  logOut(): any {
    this.storage.removeJWTToken();
    this.empSvc.emp.isLoggedIn = false;
    this.empSvc.emp.data = {};
    this.router.navigate(['/login']);
  }

  updateEmployeeList(list: any) {
    this.employees = list;
  }
}
