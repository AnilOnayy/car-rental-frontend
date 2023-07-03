import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',

  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  addColorForm : FormGroup;

  constructor(
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private colorService : ColorService
  ) {}


ngOnInit(): void {
  this.initForm();
}

initForm()
{
  this.addColorForm = this.formBuilder.group({
    colorName : ["",Validators.required]
  })
}

onSubmit()
{
  if(this.addColorForm.valid)
  {
    let colorObject  = Object.assign({},this.addColorForm.value);

    this.colorService.addColor(colorObject).subscribe(res => {
      this.toastrService.success(res.message,res.title);
      this.addColorForm.reset();
    })
  }
  else{
    this.toastrService.error("Please fill the form.","Error");
  }
}

}
