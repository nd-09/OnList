import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TickitService {

  selectedTicket: Ticket
  constructor(private http: HttpClient) {}
  token = window.localStorage.getItem('token');
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };
  getTicket(id:string){
    return this.http.get(`http://localhost:8000/ticket/${id}`)   
  }
  getTickits() {
    return this.http.get('http://localhost:8000/ticket/all');
  }
  addTickits(
    title: string,
    description: string
  ): Observable<any> {
    return this.http.post(
      'http://localhost:8000/ticket/add',
      {
        title,
        description,

      },
      this.httpOption
    );
  }
  updateTickit(
    id:string,
    title:string,
    description:string
    
  ):Observable<any>{
    return this.http.put(`http://localhost:8000/ticket/${id}`,
    { 
      
    title,
    description
    },
    this.httpOption
    );
  }
}
