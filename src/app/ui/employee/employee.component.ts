import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { CrudEmployeeService } from 'src/app/services/utils/crud-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  loggedInEmp: any;

  constructor(private empService: EmployeeService, private empSvc: CrudEmployeeService,
    public router: Router) { }

  ngOnInit(): void {
    this.empService.getAllEmployees();
    if (this.empSvc.emp.data) {
      this.loggedInEmp = this.empSvc.emp.data;
    }
  }

}
