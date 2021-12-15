import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CrudEmployeeService } from '../services/utils/crud-employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isError = false;

  constructor(private http: HttpClient, private readonly fb: FormBuilder, private empService: EmployeeService,
    private empSvc: CrudEmployeeService) { 
    this.form = this.fb.group({
      empId: ['', Validators.required],      
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(formData?: any): Promise<void> {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      await this.empService.loginEmployee(this.form.getRawValue());
      this.isError = this.empSvc.emp.isLoggedIn ? false : true; 
    } else {
      console.log('There is a problem with the form');
    }
    
    
  }

}
