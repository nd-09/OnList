import { Component, OnInit } from '@angular/core';
import { TickitService } from '../services/tickit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raise-tickits',
  templateUrl: './raise-tickits.component.html',
  styleUrls: ['./raise-tickits.component.scss'],
})
export class RaiseTickitsComponent implements OnInit {
  constructor(readonly auth: TickitService) {}
  form: any = {
    Title: null,
    Description: null,
  };
  tickit_id:string;
  ngOnInit(): void {
  }
  onSubmit() {
    const tickit = this.form;
     console.log('tickit', this.tickit_id);
    if (tickit.Title !== null && tickit.Description !== null&& !this.tickit_id) {
      this.auth.addTickits(this.form.Title, this.form.Description).subscribe({
        next: (data) => {
          Swal.fire('Success','Ticket added successfully','success')
          window.location.href = '/dashboard';
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error','Please try again Something went wrong','warning')
        },
      });
  }else{
    const tickit = this.form;
    if (tickit.Title !== null && tickit.Description !== null && this.tickit_id) {
      this.auth.updateTickit(this.form.Title, this.form.Description,this.tickit_id).subscribe({
        next: (data) => {
          Swal.fire('Success','Tickets Updated successfully','success')
          window.location.href = '/dashboard';
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error','Please try again Something went wrong','warning')
        },
      });
    } else {
      //error all the above field are mandatory
      Swal.fire('Above mentioned','fields are mandatory','info')
    }
  }
  }  
}
