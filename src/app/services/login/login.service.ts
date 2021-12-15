import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  generateToken() {
    this.http.get(`${this.API_URL}/api/login`).subscribe({
      next: (res: any) => {
        if(res['token']) {
          localStorage.setItem('token', res['token']);
          console.log(res);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
