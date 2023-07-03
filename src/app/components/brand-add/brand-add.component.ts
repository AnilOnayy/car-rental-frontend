import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  addBrandForm : FormGroup;

  constructor(
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private brandService : BrandService
  ) {}


ngOnInit(): void {
  this.initForm();
}

initForm()
{
  this.addBrandForm = this.formBuilder.group({
    brandName : ["",Validators.required]
  })
}

onSubmit()
{
  if(this.addBrandForm.valid)
  {
    let brandObject  = Object.assign({},this.addBrandForm.value);

    this.brandService.addBrand(brandObject).subscribe(res => {
      this.toastrService.success(res.message,res.title);
      this.addBrandForm.reset();
    })
  }
  else{
    this.toastrService.error("Please fill the form.");
  }
}

}
