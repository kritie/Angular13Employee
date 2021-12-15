import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudEmployeeService } from 'src/app/services/utils/crud-employee.service';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateComponent implements OnInit {
  form: FormGroup;
  new = true;
  editMode = false;
  isError = false;
  constructor(
    private readonly fb: FormBuilder,
    private empService: EmployeeService,
    private crudEmp: CrudEmployeeService,
    public router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.router.url === '/employee/update') {
      this.editMode = true;
      const data = this.crudEmp.emp.data;
      if (this.crudEmp.emp.data) {
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          designation: data.designation,
          email: data.email
        });
      }
    } else {
      this.editMode = false;
    }
  }
  
  addNew(): void {
    this.crudEmp.addNewEmployee(this.form.getRawValue(), JSON.stringify(this.empService.employees))
    .subscribe((data: any) => {
      this.empService.updateEmployeeList(data.employees);
      this.router.navigate(['/employee/view-all']);
    });
  }

  updateEmp(): void {
    const formData = this.form.getRawValue();
    let requestData: any = {};
    requestData.empId = this.crudEmp.emp.data.id;
    requestData.password = this.crudEmp.emp.data.password;
    requestData.firstName = formData.firstName;
    requestData.lastName = formData.lastName;
    requestData.phoneNumber = formData.phoneNumber;
    requestData.designation = formData.designation;

    this.crudEmp.updateEmployee(requestData, JSON.stringify(this.empService.employees))
    .subscribe((data: any) => {
      this.empService.updateEmployeeList(data.employees);
      this.router.navigate(['/employee/view-all']);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.editMode) {
      this.updateEmp();
    } else {
      this.addNew();
    }
   
  }
}
