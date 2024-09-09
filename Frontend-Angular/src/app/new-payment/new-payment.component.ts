import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{

  PaymentFormGroup! : FormGroup;
  studentCode! : string;
  paymentsTypes : string[]=[];
  pdfFileUrl! : string;
  showProgress : boolean = false;

  constructor(private fb : FormBuilder,
              private activatedRoute : ActivatedRoute,
              private studentsService : StudentsService) {
  }

  ngOnInit(): void {

    for(let elm in PaymentType){
      let value = PaymentType[elm];
      if (typeof value === 'string'){
        this.paymentsTypes.push(value);
      }
    }
    this.studentCode = this.activatedRoute.snapshot.params['studentCode'];
    this.PaymentFormGroup = this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      studentCode : this.fb.control(this.studentCode.toString()),
      fileSource : this.fb.control(''),
      fileName : this.fb.control('')
    });
  }

  selectFile(event: any) {
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.PaymentFormGroup.patchValue({
        fileSource : file,
        fileName : file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    this.showProgress = true;
    let date = new Date(this.PaymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let formData = new FormData();
    formData.set('date',formattedDate);
    formData.set('amount',this.PaymentFormGroup.value.amount);
    formData.set('type',this.PaymentFormGroup.value.type);
    formData.set('studentCode',this.PaymentFormGroup.value.studentCode);
    formData.set('file',this.PaymentFormGroup.value.fileSource);

    this.studentsService.savePayment(formData).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Payment Saved successfully !');
      },
      error : err => {
        console.log(err);
      }
    });

  }

  afterLoadComplete(event: any) {
    console.log(event);
  }
}
