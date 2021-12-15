import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setJWTToken(tokenData: any) {
    localStorage.setItem('token', tokenData['token']);
  }

  getJWTToken(): any {
    return localStorage.getItem('token');
  }

  removeJWTToken(): any {
    localStorage.removeItem('token');
  }
}
