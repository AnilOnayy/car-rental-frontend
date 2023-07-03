import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent {
  editColorForm : FormGroup;
  currentColor : Color;
  colorId : number;

  constructor(
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private colorService : ColorService,
    private activatedRoute :ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"])
      {
        this.getColor(params["colorId"]);
      }
    })

  }

  initializeForm(){
    this.editColorForm = this.formBuilder.group({
      colorName : [
        '', Validators.required
      ],
      colorId :[
        '' , Validators.required
      ]
    })
  }

  getColor(colorId :number)
  {
    this.colorService.getColor(colorId).subscribe(res => {
      this.currentColor = res.data;
      this.editColorForm.patchValue(res.data);
    },
    error => {
      let err : ErrorResponseModel = error;
      this.toastrService.error(err.error.message,err.error.title);
      this.router.navigateByUrl("/");
    });
  }

  onSubmit()
  {
    if(this.editColorForm.valid)
    {
      let form = this.editColorForm.value;

      this.colorService.updateColor(form).subscribe(res => {
        this.toastrService.success(res.message,res.title)
      })
    }

  }
}
