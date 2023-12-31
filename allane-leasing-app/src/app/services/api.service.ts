import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient,) { }

  //GET API service
  get(url:string, headers?: {}): Observable<any>{
     headers = this.setHeaders();
     return this.httpClient.get(url, {headers: new HttpHeaders(headers)})
  }

  post(url:string, params?: {}): Observable<any>{
    const headers = this.setHeaders();
    return this.httpClient.post(url, params, {headers: new HttpHeaders(headers)})
  }

  put(url:string, params?: {}): Observable<any>{
    const headers = this.setHeaders();
    return this.httpClient.put(url, params, {headers: new HttpHeaders(headers)})
  }

  delete(url:string, headers?: {}): Observable<any>{
    headers = this.setHeaders();
    return this.httpClient.delete(url, {headers: new HttpHeaders(headers)})
  }

  // setting headers.
  private setHeaders() {
      let headers = { "Content-Type": "application/json"};
      return headers;
  }
}
