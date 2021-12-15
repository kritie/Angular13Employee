import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CrudEmployeeService } from 'src/app/services/utils/crud-employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private empService: EmployeeService, private empSvc: CrudEmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.empSvc.emp.isLoggedIn;
  }

  // logOut(): void {
  //   this.empService.logOut();
  //   this.router.navigate(['/']);
  // }

}
