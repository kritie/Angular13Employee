import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  fetchCarousalData() {
    return this.http.get<{images: any[]}>(`${this.API_URL}/api/images`);
  }
}
