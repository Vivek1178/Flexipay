
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {

//   constructor() { }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/auth/getRecords'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllRecords(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
