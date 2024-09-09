import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/students.model";
import {StudentsComponent} from "../students/students.component";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient) { }

  public getAllPayments() : Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(  `${environment.backendHost}/payments`);
  }

  public getAllStudents() : Observable<Array<Student>>{
    return this.http.get<Array<Student>>(  `${environment.backendHost}/students`);
  }

  public getStudentPayments(code : string) : Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(  `${environment.backendHost}/student/${code}/payments`);
  }

  public savePayment(formData : any) : Observable<Payment>{
    return this.http.post<Payment>(  `${environment.backendHost}/payments`,formData);
  }

  getPaymentDetails(paymentId: number)  {
    return this.http.get(`${environment.backendHost}/payments/${paymentId}/file`,
      {responseType:'blob'});
  }
}
