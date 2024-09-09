import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students! : Array<Student>;
  studentsDataSource! : MatTableDataSource<Student>;
  displayedColumns : string[] = ['id','firstName','lastName','code','programId','payments'];

  @ViewChild(MatSort) sort! : MatSort;

  constructor(private studentsService : StudentsService,private router : Router) {
  }

  ngOnInit(): void {
    this.studentsService.getAllStudents().subscribe({
      next : data =>{
        this.students = data;
        this.studentsDataSource = new MatTableDataSource<Student>(this.students);
        this.studentsDataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    })
  }

  studentPayments(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`)
  }
}
