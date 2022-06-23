import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RaiseTickitsComponent } from '../raise-tickits/raise-tickits.component';
import { AuthService } from '../services/auth.service';
import { TickitService } from '../services/tickit.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

export interface Tickit_Data {
  Description: String;
  IS_Deleted: Boolean;
  Title: String;
  User_Name: String;
  User_id: String;
  _id: String;
  createdAt: String;
}
let ELEMENT_DATA: any = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}

  Name = localStorage.getItem('Name');
  editable:boolean;
  Title: any;
  Description: any;
  dataSource: any;
  displayedColumns = [
    'No',
    'Title',
    'Description',
    'Created_By',
    'Created_At',
    'Edit',
    'Delete',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dailog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private authTickits: TickitService
  ) {
    this.fetchTickits();
  }

  userID = localStorage.getItem('_id');
  Ticketid: string;
  fetchTickits() {
    this.authTickits.getTickits().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.tickets);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openDialog() {
    this.dailog.open(RaiseTickitsComponent, { width: '30%' });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['']);
    Swal.fire('Logout successfully','','success')
  }
  onEdit(id: string) {
    this.openDialog();
    this.authTickits.getTicket(id).subscribe({
      next: (data: any) => {
        console.log('data', data);

        this.authTickits.updateTickit(id, this.Title, this.Description);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  isEditable(): boolean {
    if (this.userID === this.dataSource._id) {
      this.editable = true;
      return true;
    } else {
      this.editable = false;
      return false;
    }
  }
}
