import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  addBrandForm : FormGroup;
  brands :Brand[];

  constructor(
    private datasharingService : DataSharingService,
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private brandService : BrandService
  ) {}


ngOnInit(): void {
  this.initForm();

    this.datasharingService.brands$.subscribe(brands => {
    this.brands = brands;
  })
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
      this.brands.push(res.data);
      this.datasharingService.setBrands(this.brands);
      this.addBrandForm.reset();
    })
  }
  else{
    this.toastrService.error("Please fill the form.");
  }
}

}
