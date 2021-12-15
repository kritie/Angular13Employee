import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CrudEmployeeService {

  readonly API_URL = 'http://localhost:3000';

  emp : any = {
    isLoggedIn : false,
    data: {}
  }

  constructor(private http: HttpClient) { }

  addNewEmployee(data: any, empList: any) {
    const body = {
      empData: data,
      employees: empList
    }
    return this.http.post(`${this.API_URL}/api/employee`, { body });
  }

  updateEmployee(empData: any, empList: any) {
    const body = {
      // empId : id,
      empData: empData,
      employees: empList
    }
    return this.http.put(`${this.API_URL}/api/employee`, { body });

  }

  deleteEmployee(id: number, employees: any): Observable<any> {
    const body = {
      empId : id,
      employees: employees
    }
    return this.http.delete(`${this.API_URL}/api/employee`, { body });
  }

  resetEmployee() {
    this.emp = {
      isLoggedIn : false,
      data : {}
    }
  }

  setEmployee(empData:any) {
    this.emp = {
      isLoggedIn: true,
      data: empData
    }
  }

}
