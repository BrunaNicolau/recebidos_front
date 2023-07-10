import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.sass']
})
export class EditReceiptComponent implements OnInit {

  editReceiptForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ){}

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.editReceiptForm = this.fb.group({
      id: [{value:'', disabled: true }],
      responsible: [{value:''}, [Validators.required]],
    // responsible: [{value:''}, [Validators.required]],
 
    })

  }

}
