import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{

  studentCode! : string;
  studentPayments! : Array<Payment>;
  paymentsDataSource! : MatTableDataSource<Payment>;
  public displayedColumns =['id','date','amount','type','status','firstName','details'];

  //@ViewChild(MatPaginator) paginator! : MatPaginator;
  //@ViewChild(MatSort) sort! : MatSort;

  constructor(private activatedRoute : ActivatedRoute,
              private studentsService : StudentsService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.studentsService.getStudentPayments(this.studentCode).subscribe({
      next : value => {
        this.studentPayments = value;
        this.paymentsDataSource = new MatTableDataSource<Payment>(this.studentPayments);
        //this.paymentsDataSource.paginator = this.paginator;
        //this.paymentsDataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
  }

  paymentDetails(payment:Payment) {
    this.router.navigateByUrl(`/admin/payment-details/${payment.id}`)
  }
}
