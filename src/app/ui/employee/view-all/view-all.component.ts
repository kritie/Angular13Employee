import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudEmployeeService } from 'src/app/services/utils/crud-employee.service';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  employees: any;
  searchText: any;
  key: any;

  constructor(private empService: EmployeeService, private crudEmp: CrudEmployeeService) { }

  async ngOnInit(): Promise<void> {
    this.employees = this.empService.employees;
    console.log('inside view all',this.empService.employees); 
  }

  async deleteEmployee(id: number): Promise<void> {
    this.crudEmp.deleteEmployee(id, JSON.stringify(this.employees))
      .subscribe((data: any) => {
        this.employees = data.employees;
        this.empService.updateEmployeeList(data.employees);
    });
  }

  filterBy(key: any, event: any): void {
    this.searchText = event.target.value;
    this.key = key;
  }
    
}
